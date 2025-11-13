import { defineStore } from "pinia";
import { ref, onMounted, watch, computed } from "vue";
import type { Reminder, Reminders } from "../types";

type MapReminders = Record<string, Reminders>; 

export const useReminderStore = defineStore('reminders', () => {
    
    const now = new Date();
    const open = ref(false)
    const year = ref(now.getFullYear());
    const month = ref(now.getMonth() + 1)
    const remindersMap = ref<MapReminders>({})
    
    const monthName = computed(() => months[month.value - 1])
    const lastDay = computed(() => new Date(year.value, month.value,0).getDate())
    
    const nextMonth = () => {
        let m = month.value +1
        let y = year.value
        if(m > 12) {
            m = 1;
            y++
        }
        month.value = m
        year.value = y
    }
    const prevMonth = () => {
        let m = month.value - 1
        let y = year.value
        if(m < 1) {
            m = 12
            y--
        }
        month.value = m
        year.value = y
    }
    
    const LS_KEY = 'calendar_reminders';
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const saveReminder = (
        newReminder: Reminder
    ) => {
        remindersMap.value[newReminder.date] ||= []
        remindersMap.value[newReminder.date]?.push(newReminder)
    }

    const isToday = (
        d: number
    ) => {
        const t = new Date();
        return (
            d === t.getDate() &&
            month.value - 1 === t.getMonth() &&
            year.value === t.getFullYear()
        );
    }

    const iso = (
        y: number, 
        m: number, 
        d: number
    ) => {
        const mm = String(m).padStart(2, '0');
        const dd = String(d).padStart(2, '0');
        return `${y}-${mm}-${dd}`;
    }

    const openModal = (
        time?: string, 
        reminder?: Reminder
    ) => {
        open.value = true
    }
    
    const closeModal = () => open.value = false

    onMounted(() => {
        const rawData = localStorage.getItem(LS_KEY)
        remindersMap.value = rawData ? JSON.parse(rawData) : {}
    })

    watch(remindersMap, () => {
        localStorage.setItem(LS_KEY, JSON.stringify(remindersMap.value))
    }, {
        deep: true
    })

    return {
        iso,
        year,
        month,
        open,
        isToday,
        lastDay,
        weekDays,
        monthName,
        nextMonth,
        prevMonth,
        openModal,
        closeModal,
        saveReminder,
        reminders: remindersMap,
    }
})