<script setup lang="ts">
  import Days from './Days.vue'
  import Modal from './Modal.vue'
  import Header from './Header.vue'
  import WeekDays from './WeekDays.vue'
  import AddReminderButton from './AddReminderButton.vue'
  import { useReminderStore } from '../store/useRemidersStore'

  const store = useReminderStore()
  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
</script>

<template>
  <section class="calendar" aria-label="Calendario mensual">
    <Header />
    <WeekDays :week-days="weekDays"/>
    <Days :is-today="store.isToday" :last-day="store.lastDay"/>
    <AddReminderButton/>
    <Modal />
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
    --chip: #2563eb;        /* color de chips */
    --chip-fg: #fff;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --fg: #e5e7eb;
      --muted: #9ca3af;
      --bg: #0b1020;
      --card: #131a2e;
      --ring: #60a5fa22;
      --today: #60a5fa;
      --brand: #2563eb;
    }
  }

  .calendar {
    position: relative;
    max-width: 620px;
    margin: 1.5rem auto;
    padding: 1rem 1rem 4.5rem;
    background: var(--bg);
    color: var(--fg);
    border-radius: var(--radius);
    box-shadow: 0 8px 24px var(--ring);
    border: 1px solid #ffffff10;
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
</style>