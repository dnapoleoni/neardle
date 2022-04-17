import { defineStore } from 'pinia'

export const useDummyData = defineStore({
    id: 'dummy',
    state: () => {
        return {
            foo: String,
            fetching: false
        }
    },

    getters: {
        localData(state) {
            return state.foo;
        },

        isFetching(state) {
            return state.fetching;
        }
    },

    actions: {
        async fetchLocalData() {
            this.fetching = true;
            const response = await fetch('/dummy-local.json');
            try {
                const result = await response.json();
                this.foo = result.data;
            } catch (err) {
                this.foo = null;
                console.error('Error loading local storage:', err);
                return err;
            }

            this.fetching = false;
        }
    }
})