import { defineStore } from 'pinia'

export const useGameStore = defineStore({
    id: 'game',
    state: () => {
        return {
            answer: String,
            list: String,
            board: [],
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
        async fetchWordList() {
            this.fetching = true;
            const response = await fetch('/list-alphabetical.txt');
            // const response = await fetch('/list-shuffled.txt');
            try {
                const result = await response.text();
                this.list = result.split("\n");

                // calculate date, return corresponding answer
                const timeDiff = new Date().getTime() - new Date("18 Apr 2022").getTime();
                const answerIndex = Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % this.list.length;
                this.answer = this.list[answerIndex];
            } catch (err) {
                this.list = null;
                console.error('Error loading local storage:', err);
                return err;
            }

            this.fetching = false;
        },

        guessWord(str) {
            this.board.push(str);
        }
    }
})