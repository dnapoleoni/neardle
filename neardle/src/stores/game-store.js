import { defineStore } from 'pinia'

export const useGameStore = defineStore({
    id: 'game',
    state: () => {
        return {
            answer: "",
            guess: "",
            board: [],
            words: [],
            newGame: true,
            fetched: null
        }
    },

    getters: {

        getBoard(state) {
            return state.board;
        },

        getAnswer(state) {
            return state.answer;
        },

        isFetched(state) {
            return state.fetched;
        }
    },

    actions: {
        async fetchGameData() {

            //
            this.fetched = false;

            // get answer list
            await fetch('/list-alphabetical.txt').then(response => {
                return response.text();
            }).then(answers => {
                
                // temp answer list
                const list = answers.split("\n");

                // calculate date, return corresponding answer
                const timeDiff = new Date().getTime() - new Date("18 Apr 2022 21:57").getTime();
                const answerIndex = Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % list.length;

                // get today's word
                this.answer = list[answerIndex];

                // get saved answer
                const savedAnswer = this.ls('answer');

                // compare & set 
                this.newGame = this.answer != savedAnswer;
                if (this.newGame) {
                    this.ls("answer", this.answer);
                    this.ls("board", []);
                    this.board = [];
                } else {
                    this.board = this.ls("board") || [];
                }

            }).catch(err => {
                this.fetched = false;
            }).then(async () => {
                console.log('after alpha')

                // fetch all words to check against for validity
                await fetch('/list-all.txt').then(response => {
                    return response.text();
                }).then(words => {
                    
                    // format all words
                    this.words = words.split("\r\n");
                }).catch(err => {
                    this.fetched = false;
                }).then(() => {
                    console.log('after aaaaall');
                    this.fetched = true;
                })
            })
        },

        // private local storage getter/setter
        ls(id, v) {
            if (v != undefined) {
                localStorage.setItem("neardle-" + id, JSON.stringify(v));
            } else {
                return JSON.parse(localStorage.getItem("neardle-" + id));
            }
        },

        // push to board
        guessWord(str) {
            this.board.push(str.toUpperCase());
            this.ls("board", this.board);
        }
    }
})