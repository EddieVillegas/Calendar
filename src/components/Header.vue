<script setup lang="ts">
    import { useReminderStore } from '../store/useRemidersStore';
    const store = useReminderStore()
</script>

<template>
    <header class="cal-header">
      <button class="nav" aria-label="prev month" @click="store.prevMonth">‹</button>
      <h2>{{ store.monthName }} {{ store.year }}</h2>
      <button class="nav" aria-label="next month" @click="store.nextMonth">›</button>
    </header>
</template>


<style scoped>
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
</style>