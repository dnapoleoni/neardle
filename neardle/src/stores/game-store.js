import { defineStore } from 'pinia'

export const useGameStore = defineStore({
    id: 'game',
    state: () => {
        return {
            answer: String,
            list: String,
            board: Array,
            fetching: false
        }
    },

    getters: {

        getBoard(state) {
            return state.board;
        },

        getAnswer(state) {
            return state.answer;
        },

        isFetching(state) {
            return state.fetching;
        }
    },

    actions: {
        async fetchGameData() {

            // get saved data
            const saved = JSON.parse(localStorage.getItem('deep-state'));

            this.fetching = true;
            const response = await fetch('/list-alphabetical.txt');
            try {
                const result = await response.text();
                this.list = result.split("\n");

                // calculate date, return corresponding answer
                const timeDiff = new Date().getTime() - new Date("18 Apr 2022").getTime();
                const answerIndex = Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % this.list.length;

                // check if different
                this.answer = this.list[answerIndex];

                // get saved board first
                this.board = saved.game.board || [];
            } catch (err) {
                this.list = null;
                console.error('Error loading local storage:', err);
                return err;
            }

            this.fetching = false;

            return Promise.resolve(1);
        },

        guessWord(str) {
            this.board.push(str);
        },

        deleteWord(str) {
            this.board.splice(this.board.indexOf(str), 1)
        }
    }
})