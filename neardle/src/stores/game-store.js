import { defineStore } from 'pinia'

export const useGameStore = defineStore({
    id: 'game',
    state: () => {
        return {
            answer: "",
            guess: "",
            board: [],
            new: true,
            fetched: null
        }
    }
})