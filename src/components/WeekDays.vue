<template>
    <ol class="weekdays" aria-hidden="true">
      <li v-for="day in weekDays">
        {{ day }}
      </li>
    </ol>
</template>

<script setup lang="ts">
    type Props = { weekDays: string[]}
    const { weekDays } = defineProps<Props>()
</script>

<style scoped>
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
</style>