import { createRouter, createMemoryHistory } from "vue-router";
import Calendar from '../components/Calendar.vue'
import Day from "../views/Day.vue";

const routes = [
    {
        path: "/",
        component: Calendar
    },
    {
        path: "/:id",
        component: Day
    }
]


export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})