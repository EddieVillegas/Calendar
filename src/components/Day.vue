<template>
    <li :class="['day', {'is-today': isToday}]">
      <slot></slot>
    </li>
</template>

<script setup lang="ts">

    type Props = {
        isToday: boolean
    }

    const { isToday } = defineProps<Props>()

</script>

<style scoped>
.day {
    background: var(--card);
    border-radius: calc(var(--radius) - 6px);
    padding: .6rem;
    min-height: 90px;
    display: grid;
    grid-template-rows: auto 1fr;
    align-content: start;
    border: 1px solid #ffffff10;
    position: relative;
    cursor: pointer;
  }
  .day:hover{
    background: var(--select);
  }

  .day {
    font: 600 .95rem/1.1 Inter, ui-sans-serif, system-ui;
  }
  .day > * { font-weight: 500; }

  /* Número arriba a la izquierda */
  .day::after {
    content: attr(data-day, "");
  }

  /* Estilo “hoy” si lo marcas con una clase */
  .day.is-today {
    outline: 2px solid var(--today);
    outline-offset: 2px;
  }

  /* Opcional: que las celdas conserven proporción en pantallas amplias */
  @media (min-width: 520px) {
    .day { aspect-ratio: 1; }
  }

</style>