<script setup lang="ts">
  import {ref} from 'vue'

  import Modal from './Modal.vue'
  import Day from './Day.vue'

  const open = ref(false)
  const currentDay = ref(new Date().getDate())
  const currentMonth = ref(new Date().getMonth())
  const daysOfMonth = Array.from({length: 31}, (_,i) => i+1)
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const openModal = () => open.value = true
  const closeModal = () => open.value = false

</script>

<template>
  <section class="calendar" aria-label="Calendario mensual">
    <header class="cal-header">
      <h2>{{ months[currentMonth] }}</h2>
    </header>
    <ol class="weekdays" aria-hidden="true">
      <li v-for="day in daysOfWeek">
        {{ day }}
      </li>
    </ol>
    <ol class="days" style="--start: 6">
      <Day 
          v-for="day in daysOfMonth"
          :isToday="day === currentDay"
        >
          {{ day }}
      </Day>
    </ol>
    <button
      id="fabAdd" 
      class="fab" 
      aria-label="Agregar recordatorio" 
      title="Agregar recordatorio" 
      @click="openModal"
    >
      +
    </button>
    <Modal :open="open" :onClose="closeModal" />
  </section>
</template>


<style scoped>
  * {
    --radius: 14px;
    --gap: .1rem;
    --fg: #111;
    --muted: #6b7280;
    --ring: #2563eb33;
    --bg: #fff;
    --card: #f8fafc;
    --today: #2563eb;
    --select: #fbcacc;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --fg: #e5e7eb;
      --muted: #9ca3af;
      --bg: #0b1020;
      --card: #131a2e;
      --ring: #60a5fa22;
      --today: #60a5fa;
    }
  }

  .calendar {
    position: relative;
    max-width: 520px;
    margin: 1.5rem auto;
    padding: 1rem 1rem 4rem;
    background: var(--bg);
    color: var(--fg);
    border-radius: var(--radius);
    box-shadow: 0 8px 24px var(--ring);
    border: 1px solid #ffffff10;
  }

  .cal-header {
    display: flex; align-items: center; justify-content: center;
    margin-bottom: .75rem;
  }
  .cal-header h2 {
    font: 600 1.2rem/1.2 system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif;
    margin: 0;
  }

  .weekdays, .days {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--gap);
  }

  .weekdays {
    margin-bottom: .5rem;
    color: var(--muted);
    font: 600 .8rem/1 system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif;
    text-transform: uppercase;
    letter-spacing: .04em;
  }
  .weekdays > li {
    text-align: center;
  }

  .days {
    counter-reset: day;
  }
  .days > .day:first-child {
    grid-column: var(--start);
  }

  .fab {
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 52px;
    height: 52px;
    border-radius: 999px;
    border: none;
    background: var(--today);
    color: white;
    font: 700 28px/52px Inter, system-ui;
    box-shadow: 0 4px 16px var(--ring);
    cursor: pointer;
  }
  .fab:focus-visible { outline: 3px solid var(--ring); }
</style>