import { storeToRefs } from "pinia";

export class GameLogic {

    // private
    #validWords = [];
    #minLetters = 5;
    #maxLetters = 5;
    #START_DATE = "24 Apr 2022 14:43";
    
    MODE_TOTAL = "total_mode";
    MODE_SPLIT = "split_mode";

    // new GameLogic
	constructor() {

		//
        this.todaysWord = "";
        this.gameBoard = [];
        this.newGame = true;
        this.fetched = false;
	}

    // min-max check
    isValidLength(guess) {
        const len = guess.length;
        return len >= this.#minLetters && len <= this.#maxLetters;
    }

    // is in valid word list
    isValidWord(guess) {
        console.log(guess)
        return this.#validWords.indexOf(guess) > -1;
    }

    // 
    guessWord(guess) {

        //
        this.gameBoard.push(guess);
        this.ls("board", this.gameBoard);

        // check if winner
        if (guess == this.todaysWord) {
            // success!
            console.log("WINNNER")
        }
    }

    getDistance(guess, mode) {

        // map letters and compare to answer
        const distances = guess.split("").map((letter, index) => {
            const letterCode = letter.charCodeAt();
            const answerCode = this.todaysWord[index].charCodeAt();
            return Math.abs(letterCode - answerCode);
        })
        
        // return array depending on mode
        switch (mode) {
            case this.MODE_TOTAL:
                return distances.reduce((a, b) => a + b, 0);
            case this.MODE_SPLIT: 
                return distances;
        }
    }

    // initial data fetch
    async fetchWordList() {

        // get answer list
        await fetch('/list-alphabetical.txt').then(response => {
            return response.text();
        }).then(answers => {
            
            // temp answer list
            const list = answers.split("\n");

            // calculate date, return corresponding answer
            const timeDiff = new Date().getTime() - new Date(this.#START_DATE).getTime();
            const answerIndex = Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % list.length;

            // get today's word
            this.todaysWord = list[answerIndex];

            // get saved answer
            const savedAnswer = this.ls('answer');

            // compare & set 
            this.newGame = this.todaysWord != savedAnswer;
            
            if (this.newGame) {
                this.ls("answer", this.todaysWord);
                this.ls("board", []);
                this.gameBoard = [];
            } else {
                this.gameBoard = this.ls("board") || [];
            }

        }).catch(err => {
            // ERROR
            throw new Error("Couldn't load answer list");
        }).then(async () => {

            // fetch all words to check against for validity
            await fetch('/list-all.txt').then(response => {
                return response.text();
            }).then(words => {
                
                // format all words
                this.#validWords = words.split("\r\n");
            }).catch(err => {
                // ERROR
                throw new Error("Couldn't load valid word list");
            }).then(() => {
                this.fetched = true;
                return Promise.resolve();
            })
        })
    }

    // local storage getter/setter
    ls(id, v) {
        if (v != undefined) {
            localStorage.setItem("neardle-" + id, JSON.stringify(v));
        } else {
            return JSON.parse(localStorage.getItem("neardle-" + id));
        }
    }
};