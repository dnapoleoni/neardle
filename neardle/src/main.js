import { watch, createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.scss'

const store = createPinia()

// force guess uppercase to match lists
watch(
    store.state, 
    (state, newState) => {
        state.game.guess = newState.game.guess.toUpperCase();
    },{deep: true}
)

createApp(App).use(store).mount('#app')