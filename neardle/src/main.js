import { watch, createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.scss'

const store = createPinia()

// store mutations
watch(
    store.state, 
    (state, newState) => {
        
        // force guesses uppercase
        state.game.guess = newState.game.guess.toUpperCase();
    },{deep: true}
)

createApp(App).use(store).mount('#app')