import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Button from './common/Button/Button.vue'
import Input from './common/Input/Input.vue'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia)
app.component('Button', Button)
app.component('Input', Input)
app.mount('#app');
