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