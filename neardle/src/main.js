import { watch, createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.scss'

const store = createPinia()

createApp(App).use(store).mount('#app')