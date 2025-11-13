<template>
    <li 
      :class="['day', {'is-today': isToday}]"
    >
      <div class="num">{{ day }}</div>
          <div class="reminders">
            <div 
              class="chip"
              :key="reminder.text"
              :title="reminder.text"
              v-for="reminder in store.reminders[store.iso(store.year, store.month, day)]"
              :style="{ backgroundColor: reminder.color }"
              @click="openModal(iso(store.year, store.month, day), reminder)"
            >
              {{ reminder.text }}
            </div>
          </div>
    </li>
</template>

<script setup lang="ts">
  import { useReminderStore } from '../store/useRemidersStore';

  type Props = {
    day: number
    isToday: boolean
  }

  const { day } = defineProps<Props>()

  const store = useReminderStore()

  const {openModal, iso} = store

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
  .day::after {
    content: attr(data-day, "");
  }
  .day.is-today {
    outline: 2px solid var(--today);
    outline-offset: 2px;
  }
  .num { font: 700 .95rem/1.1 Inter, ui-sans-serif, system-ui; }
  .reminders {
    margin-top: .45rem;
    display: grid;
    gap: .3rem;
  }
  .chip {
    display: inline-block;
    font: 600 .72rem/1.2 Inter, ui-sans-serif, system-ui;
    color: var(--chip-fg);
    padding: .25rem .45rem;
    border-radius: 999px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (min-width: 520px) {
    .day { aspect-ratio: 1; }
  }
</style>