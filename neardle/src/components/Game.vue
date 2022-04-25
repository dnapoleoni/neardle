<script setup>

  // logic
  import { storeToRefs } from 'pinia'
  import { useGameStore } from '../stores/game-store'
  import { GameLogic }  from '../logic/game-logic'

  // components
  import Board from '../components/Board.vue'

  // objects
  const store = useGameStore();
  const logic = new GameLogic();

  //
  logic.fetchWordList().then(() => {

    console.log("READY")
  })  
</script>

<template>
  <div v-if="store.fetched">
    <!-- <p>{{ store.answer }}</p> -->
    <button class="px-2 absolute right-0 top-0" @click.prevent="logic.toggleMode()">{{ store.mode }}</button>
    <form @submit.prevent="logic.submitGuess(store.guess)">
      <input v-model="store.guess" class="bg-gray-200 rounded m-4 p-2 text-gray-700" maxlength="5">
      <button>Click me</button>
    </form>

    <Board />
    
  </div>
</template>
