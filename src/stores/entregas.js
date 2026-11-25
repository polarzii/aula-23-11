import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

const CHAVE = 'agenda-de-entregas-vue';

const ENTREGAS_INICIAIS = [
    { id: 1, materia: 'Matemática', tipo: 'prova', data: '2026-11-18', feita: false },
    { id: 2, materia: 'História', tipo: 'trabalho', data: '2026-11-25', feita: false },
    { id: 3, materia: 'Português', tipo: 'trabalho', data: '2026-11-10', feita: true },
    { id: 4, materia: 'Inglês', tipo: 'apresentacao', data: '2026-11-20', feita: false }
];

function carregarEntregas() {
    const salvas = localStorage.getItem(CHAVE);
    if (salvas === null) {
        return ENTREGAS_INICIAIS;
    }
    return JSON.parse(salvas);
}

function salvarEntregas(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export const useEntregasStore = defineStore('entregas', () => {
    const entregas = ref(carregarEntregas());

    watch(entregas, salvarEntregas, { deep: true });

    function adicionarEntrega(entrega) {
        entregas.value.push(entrega);
    }

    function alternarFeita(entrega) {
        entrega.feita = !entrega.feita;
    }

    function apagarEntrega(entregaApagada) {
        entregas.value = entregas.value.filter((entrega) => entrega.id !== entregaApagada.id);
    }

    return {
        entregas,
        adicionarEntrega,
        alternarFeita,
        apagarEntrega
    };
});
