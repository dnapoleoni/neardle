import { watch, createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.scss'

const store = createPinia()

// state hook
watch(
    store.state, 
    (state) => {
        localStorage.setItem('deep-state', JSON.stringify(state))
    },
    { deep: true }
)

createApp(App).use(store).mount('#app')