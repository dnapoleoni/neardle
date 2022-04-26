<script setup>

  // logic
  import { onMounted} from 'vue';
  import { useGameStore } from '../stores/game-store'
  import { GameLogic }  from '../logic/game-logic'

  // components
  import Board from './Board.vue'
  import Letter from './Letter.vue'
  import BlankBoard from './BlankBoard.vue'

  // objects
  const store = useGameStore();
  const logic = new GameLogic();

  // get data
  onMounted(() => {
    logic.fetchWordList().then(() => {
      console.log('READY');
    })
  })
</script>

<template>
  <div v-if="store.fetched" class="relative">

    <!-- deprecated mode toggle -->
    <!-- <button class="px-2 absolute right-0 top-0" @click.prevent="logic.toggleMode()">{{ store.mode }}</button> -->

    <!-- temp input -->
    <form @submit.prevent="logic.submitGuess(store.guess)">
      <input v-model="store.guess" class="bg-gray-200 rounded m-4 p-2 text-gray-700" maxlength="5">
      <button class="border-2 px-2 py-1 rounded border-gray-800">Guess</button>
    </form> 
    
    <div class="w-screen clear-both">
      <!-- game board -->
      <Board class="z-2 absolute m-auto left-0 right-0" :board="store.board" :guess="store.guess" />

      <!-- dummy board bg -->
      <BlankBoard class="absolute m-auto left-0 right-0 z-[-10]" :rows="6" :letters="5" />
    </div>
  </div>
</template>
