<!-- src/views/DayView.vue -->
<template>
  <section class="day">
    <header class="bar">
      <RouterLink class="back" to="/">‹ Mes</RouterLink>
      <h1>{{ friendlyDate }}</h1>
      <div />
    </header>

    <ul class="list">
      <li v-for="r in items" :key="r.id" class="item">
        <div class="color-dot" :style="{ backgroundColor: r.color }"></div>
        <div class="fields">
          <p>{{ r.text }}</p>
          <p>{{ r.date }}</p>
          <p>{{ r.city }}</p>
          <p v-if="r.city" class="weather-line">
            <span class="muted">Weather in {{ r.city }}: </span>
            <span v-if="loadingWeatherByReminder[r.id]"> cargando…</span>
            <span v-else-if="weatherErrorByReminder[r.id]" class="error">
              {{ weatherErrorByReminder[r.id] }}
            </span>
            <span v-else-if="weatherByReminder[r.id]">
              <strong>{{ Math.round(weatherByReminder[r.id]!.main.temp - KELVIN) }}°C</strong>
              · {{ weatherByReminder[r.id]!.weather[0]?.description }}
            </span>
          </p>
          <!-- <small class="muted">ID: {{ r.id }}</small> -->
        </div>

        <div class="actions">
          <button title="Guardar cambios">Guardar</button>
          <button class="danger" title="Eliminar" @click="removeRinder(r.id, r.date)">Eliminar</button>
        </div>
      </li>

      <li v-if="!items.length" class="empty">
        There are no reminders yet
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed, watch, reactive } from 'vue'
import { useReminderStore } from '../store/useRemidersStore'
import type { Reminder, Reminders, Weather } from '../types'
import { useLoadWeatherForCity } from '../composables/useLoadWeatherForCity'

const KELVIN = 273.15
const { list, removeRinder } = useReminderStore()

type Props = {
  day: string
}
const {day: date} = defineProps<Props>()
const items = computed<Reminders>(() => list(date))

const weatherByReminder = reactive<Record<string, Weather | null>>({})
const loadingWeatherByReminder = reactive<Record<string, boolean>>({})
const weatherErrorByReminder = reactive<Record<string, string>>({})

const friendlyDate = computed(() => {
  const [y, m, d] = date.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const loadWeatherForReminder = async (reminder: Reminder) => {
  if(!reminder.city) {
    weatherByReminder[reminder.id] = null
    weatherErrorByReminder[reminder.id] = ""
    return
  }
  const { weather, isLoading, error } = await useLoadWeatherForCity(reminder.city)
  if(!weather) weatherErrorByReminder[reminder.id] = "Error"
  weatherByReminder[reminder.id] = weather
  loadingWeatherByReminder[reminder.id] = isLoading
  weatherErrorByReminder[reminder.id] = error
}

watch(items, val => {
  val.forEach(loadWeatherForReminder)
}, {
  immediate: true
})

</script>

<style scoped>
.day{ max-width: 720px; margin: 1rem auto; padding: 1rem; background: var(--bg,#0b1020); color: var(--fg,#e5e7eb) }
.bar{ display:grid; grid-template-columns: 120px 1fr 120px; align-items:center; gap:.5rem; margin-bottom: .75rem }
.bar h1{ text-transform: capitalize; text-align:center; font: 900 1.1rem/1.2 system-ui, Inter; margin:0 }
.back{ text-decoration:none; color:#93c5fd; font-weight:800 }

.add{ display:grid; grid-template-columns: 2fr 1.2fr auto auto; gap:.5rem; margin-bottom:.75rem }
.add input{ padding:.6rem .7rem; border-radius:10px; border:1px solid #ffffff22; background:#131a2e; color:#e5e7eb }
.color-input{ width: 46px; padding:0; border-radius: 10px; border:1px solid #ffffff33; background:#131a2e }
.color-input.small{ width: 38px; }

.primary{ background:#2563eb; color:white; border:none; border-radius:10px; padding:.55rem .9rem; font-weight:800; cursor:pointer }

.list{ list-style:none; padding:0; display:grid; gap:.5rem }
.item{ background:#131a2e; border:1px solid #ffffff18; border-radius:12px; padding:.6rem; display:grid; grid-template-columns: auto 1fr auto; gap:.6rem; align-items:center }
.color-dot{ width:16px; height:16px; border-radius:999px; border:1px solid #ffffff55 }
.fields{ display:grid; gap:.3rem }
.fields input{ width:100%; padding:.45rem .6rem; border-radius:8px; border:1px solid #ffffff22; background:#0f1427; color:#e5e7eb; font-size:.85rem }
.actions{ display:flex; flex-direction:column; gap:.3rem }
.actions button{ border:1px solid #ffffff22; background:transparent; color:#e5e7eb; border-radius:8px; padding:.4rem .6rem; cursor:pointer; font-size:.8rem }
.actions .danger{ border-color:#ef4444aa; color:#ef9a9a }
.muted{ color:#9ca3af; font-size:.75rem }
.empty{ color:#9ca3af; font-style: italic; padding:.5rem 0 }
</style>
