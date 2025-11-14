import { defineStore } from "pinia";
import { ref, onMounted, watch, computed, reactive } from "vue";
import type { Reminder, Reminders } from "../types";

type MapReminders = Record<string, Reminders>; 
const LS_KEY = 'calendar_reminders';
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const useReminderStore = defineStore('reminders', () => {    
    const now = new Date();
    const open = ref(false)
    const year = ref(now.getFullYear());
    const month = ref(now.getMonth() + 1)
    const state = reactive<{map:MapReminders}>({map: {}})
    
    const monthName = computed(() => months[month.value - 1])
    const lastDay = computed(() => new Date(year.value, month.value,0).getDate())
    
    const load = () => {
        const rawData = localStorage.getItem(LS_KEY)
        state.map = rawData ? JSON.parse(rawData) : {}
    }

    const save = () => {
        localStorage.setItem(LS_KEY, JSON.stringify(state.map))
    }

    const list = (date: string): Reminders => {
        return state.map[date] || []
    }

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

    const saveReminder = (
        newReminder: Omit<Reminder, 'id'>
    ) => {
        state.map[newReminder.date] ||= []
        const id = crypto.randomUUID()
        state.map[newReminder.date]?.push({...newReminder, id })
    }

    const removeRinder = (
        id: string,
        date: string,
    ) => {
        state.map[date] ||= []
        const next = state.map[date].filter(r => r.id !== id)
        if (next.length) state.map[date] = next
        else delete state.map[date]
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
        load()
    })

    watch(state, () => {
        save()
    }, {
        deep: true
    })

    return {
        iso,
        year,
        open,
        list,
        month,
        isToday,
        lastDay,
        monthName,
        nextMonth,
        prevMonth,
        openModal,
        closeModal,
        removeRinder,
        saveReminder,
        reminders: state,
    }
})