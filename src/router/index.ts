import { createRouter, createMemoryHistory } from "vue-router";
import Calendar from '../components/Calendar.vue'
import DayView from "../views/DayView.vue";

const routes = [
    {
        path: "/",
        component: Calendar
    },
    {
        path: "/:day",
        name: "day",
        component: DayView,
        props: true
    }
]


export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})