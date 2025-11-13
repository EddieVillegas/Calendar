<script setup lang="ts">
  import Day from './Day.vue'
  import Modal from './Modal.vue'
  import { useReminderStore } from '../store/useRemidersStore'
  import AddReminderButton from './AddReminderButton.vue'
  import { storeToRefs } from "pinia"
  const store = useReminderStore()
  const {
    iso,
    isToday, 
    nextMonth, 
    prevMonth,
    openModal, 
  } = store
  const { 
    month,
    year,
    lastDay,
    weekDays,
    monthName,
    reminders, 
  } = storeToRefs(store)
</script>

<template>
  <section class="calendar" aria-label="Calendario mensual">
    <header class="cal-header">
      <button class="nav" aria-label="prev month" @click="prevMonth">‹</button>
      <h2>{{ monthName }} {{ year }}</h2>
      <button class="nav" aria-label="next month" @click="nextMonth">›</button>
    </header>
    <ol class="weekdays" aria-hidden="true">
      <li v-for="day in weekDays">
        {{ day }}
      </li>
    </ol>
    <ol class="days" :style="{'--start': 6}">
        <Day
          v-for="day in lastDay"
          :day="day"
          :key="day"
          :isToday="isToday(day)"
        />
    </ol>
    <AddReminderButton/>
    <Modal/>
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
  .cal-header {
    display: grid;
    grid-template-columns: 48px 1fr 48px;
    align-items: center;
    gap: .5rem;
    margin-bottom: .75rem;
  }
  .cal-header h2 {
    text-align: center;
    font: 700 1.2rem/1.2 system-ui, -apple-system, Segoe UI, Inter, Roboto, sans-serif;
    margin: 0;
  }
  .nav {
    height: 36px;
    border-radius: 10px;
    border: 1px solid #ffffff20;
    background: var(--card);
    cursor: pointer;
    font-size: 18px;
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