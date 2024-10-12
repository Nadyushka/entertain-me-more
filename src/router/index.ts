import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {WebsiteSubscription} from "@/pages";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: WebsiteSubscription
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
