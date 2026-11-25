<!--
    A página da agenda: tudo o que o App.vue mostrava, menos o
    cabeçalho, o rodapé e o formulário (que foi para a página
    Nova entrega). A próxima entrega do resumo leva para a página dela.
-->
<script setup>
import { ref, computed } from 'vue';
import {
    ordenarPorData,
    filtrarPendentes,
    montarTextoDaProxima,
    encontrarProxima,
    passaNoFiltro
} from '../agenda.js';
import ResumoAgenda from '../components/ResumoAgenda.vue';
import ItemEntrega from '../components/ItemEntrega.vue';
import { useEntregasStore } from '../stores/entregas.js';

const entregasStore = useEntregasStore();
const tipoEscolhido = ref('todos');

const pendentes = computed(() => filtrarPendentes(entregasStore.entregas));
const proxima = computed(() => montarTextoDaProxima(entregasStore.entregas));
const destinoDaProxima = computed(() => montarDestinoDaEntrega(encontrarProxima(entregasStore.entregas)));
const mostradas = computed(() => ordenarPorData(entregasStore.entregas.filter((e) => passaNoFiltro(e, tipoEscolhido.value))));


// Sem nada pendente, não tem para onde ir: a próxima fica sem link.
function montarDestinoDaEntrega(entrega) {
    if (entrega === undefined) {
        return '';
    }
    return `/entrega/${entrega.id}`;
}
</script>

<template>
    <main class="painel">

<ResumoAgenda :pendentes="pendentes.length" :proxima="proxima" :destino="destinoDaProxima" />

        <section class="cartao entregas">
            <h2>Próximas entregas</h2>

            <p class="filtro">
                <label for="filtro">Mostrar</label>
                <select id="filtro" class="campo-filtro" v-model="tipoEscolhido">
                    <option value="todos">Tudo</option>
                    <option value="prova">Só provas</option>
                    <option value="trabalho">Só trabalhos</option>
                    <option value="apresentacao">Só apresentações</option>
                </select>
            </p>

            <ul class="lista">
                <ItemEntrega
                    v-for="entrega in mostradas"
                    :key="entrega.id"
                    :entrega="entrega"
                    @alternar="entregasStore.alternarFeita"
                    @apagar="entregasStore.apagarEntrega"
                />
            </ul>
        </section>

    </main>
</template>
