import { useGameStore } from '../stores/game-store'

export class GameLogic {

  // private
  #validWords = [];
  #minLetters = 5;
  #maxLetters = 5;
  // #START_DATE = "24 Apr " + Math.round(Math.random() * 2100); // random word
  #START_DATE = "25 Apr 2022 00:00";
  #DELIMITER = ",";
  #VALIDS = "list-all-comma.txt";
  #ANSWERS = "list-answers-alphabetical-comma.txt";

  store = useGameStore();

  // new GameLogic
	constructor() {

		//
    this.todaysWord = "";
    this.gameBoard = [];
    this.newGame = true;
    this.fetched = false;
    
    // store setting
    this.store.mode = this.ls("mode") || "split";

    // store setting
    this.store.solved = this.ls("solved") || false;
	}

  toggleMode() {
    this.store.mode = this.store.mode == "split" 
    ? "total" 
    : "split";

    // save it
    this.ls("mode", this.store.mode);
  }

  // min-max check
  isValidLength(guess) {
    const len = guess.length;
    return len >= this.#minLetters && len <= this.#maxLetters;
  }

  // is in valid word list
  isValidWord(guess) {
    return this.#validWords.indexOf(guess) > -1;
  }

  // 
  guessWord(guess) {

    //
    this.gameBoard.push(guess);
    this.ls("board", this.gameBoard);

    // overwrite store gameboard
    this.store.updateBoard(this.gameBoard);

    // save score
    this.store.score = this.store.board.length;

    // is end of panel
    const fullBoard = this.store.board.length == 6;
    const solvedTodaysWord =  guess == this.todaysWord;

    // check if ended
    if (fullBoard || solvedTodaysWord) this.store.solved = true;
      
    // save if winner
    this.store.winner = solvedTodaysWord;
  }

  // check guess length & validity, save it
  submitGuess() {

    // first, check length
    if (this.isValidLength(this.store.guess)) {

      // check if valid word
      if (this.isValidWord(this.store.guess)) {

        // guess it
        this.guessWord(this.store.guess);
        this.store.guess = "";
      } else{
        // ERROR
        console.log("invalid word")
      }
    } else {
      // ERROR
      console.log("word length incorrect")
    }
  }

  // initial data fetch
  async fetchWordList() {

    // get answer list
    await fetch('/' + this.#ANSWERS).then(response => {
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

      this.store.updateBoard(this.gameBoard);

    }).catch(err => {
        // ERROR
        throw new Error("Couldn't load answer list");
    }).then(async () => {

      // fetch all words to check against for validity
      await fetch('/' + this.#VALIDS).then(response => {
        return response.text();
      }).then(words => {
          
        // format all words
        this.#validWords = words.split(this.#DELIMITER);
      }).catch(err => {
        // ERROR
        throw new Error("Couldn't load valid word list");
      }).then(() => {
        this.fetched = true;
        console.log('done inner')
        
        // update store
        this.store.$patch((state) => {
          state.answer = this.todaysWord;
          state.board = this.gameBoard;
          state.fetched = this.fetched;
          state.new = this.newGame;
        })
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