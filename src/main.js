import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useCourseStore } from './store'

import Button from './common/Button/Button.vue'
import Input from './common/Input/Input.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.component('Button', Button)
app.component('Input', Input)

const store = useCourseStore()
store.loadFromLocalStorage?.()

app.mount('#app')