<template>
    <ol class="days" :style="{'--start': 6}">
        <Day
          v-for="day in lastDay"
          :day="day"
          :key="day"
          :isToday="isToday(day)"
        />
    </ol>
</template>


<script lang="ts" setup>
    import Day from './Day.vue'
    type Props = { lastDay: number, isToday: (d: number) => boolean }
    const { lastDay, isToday } = defineProps<Props>()
</script>