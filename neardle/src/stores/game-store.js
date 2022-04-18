import { defineStore } from 'pinia'

export const useGameStore = defineStore({
    id: 'game',
    state: () => {
        return {
            list: String,
            fetching: false
        }
    },

    getters: {

        answer(state) {
            return state.list[Math.round(Math.random() * state.list.length)];
        },

        isFetching(state) {
            return state.fetching;
        }
    },

    actions: {
        async fetchWordList() {
            this.fetching = true;
            const response = await fetch('/list.txt');
            try {
                const result = await response.text();
                this.list = result.split("\n");
            } catch (err) {
                this.list = null;
                console.error('Error loading local storage:', err);
                return err;
            }

            this.fetching = false;
        }
    }
})