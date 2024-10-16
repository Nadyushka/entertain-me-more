import { createApp } from 'vue'
import './styles/style.scss'
import App from "./App.vue";
import {router} from "@/router";
import "normalize.css";
import {createPinia} from "pinia";

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

