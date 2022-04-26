import { defineStore, storeToRefs } from 'pinia'

export const useGameStore = defineStore({
  id: 'game',
  state: () => {
    return {
      answer: "",
      guess: "",
      board: [],
      new: true,
      fetched: null,
      mode: String,
      solved: Boolean,
      score: 0
    }
  },
  actions: {

    // overwrite board with clone array so it knows it's changed
    // this took me hhhhooooouuuuuurrrrrsss goddammit
    updateBoard(arr) {
      this.board = [... arr];
    },

    // calculate distance between letters of full word
    distance(word) {

      // map letters and compare to answer
      const distances = word.split("").map((letter, index) => {
        const letterCode = letter.charCodeAt();
        const answerCode = this.answer[index].charCodeAt();
        return Math.abs(letterCode - answerCode);
      })
        
      // return array or total depending on mode
      switch (this.mode) {
        case "total":
          return distances.reduce((a, b) => a + b, 0);
        case "split": 
          return distances;
      }
    }
  }
})