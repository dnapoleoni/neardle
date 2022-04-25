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
      mode: String
    }
  },
  actions: {

    // overwrite board with clone array so it knows it's changed
    // this took me hhhhooooouuuuuurrrrrsss goddammit
    updateBoard(arr) {
      this.board = [... arr];
    }
  }
})