import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useCourseStore } from './store'

import Button from './common/Button/Button.vue'
import Input from './common/Input/Input.vue'

const app = createApp(App)

/* ✅ Initialize Pinia */
const pinia = createPinia()
app.use(pinia)

/* ✅ Initialize Router */
app.use(router)

/* ✅ Register global components */
app.component('Button', Button)
app.component('Input', Input)

/* ✅ Load persisted store data AFTER Pinia is installed */
const store = useCourseStore()
store.loadFromLocalStorage?.()

app.mount('#app')