import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router/index'
import { useCourseStore } from '@/store/index'

import Button from '@/components/common/Button.vue'
import Input from '@/components/common/Input.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.component('Button', Button)
app.component('Input', Input)

const store = useCourseStore()
store.loadFromLocalStorage?.()

app.mount('#app')