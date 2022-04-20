<script setup>
  import { watch, ref } from 'vue' 
  import { storeToRefs } from 'pinia'
  import { useGameStore } from '../stores/game-store'

  // props
  const gameStore = useGameStore();
  const { getAnswer, getBoard, isFetched } = storeToRefs(gameStore);
  
  // methods
  const { fetchGameData, guessWord } = useGameStore();

  // create
  fetchGameData();

  const onGuess = (e) => {
    if (gameStore.guess.length == 5) {
      guessWord(gameStore.guess);
      gameStore.guess = "";
    }
  }
</script>

<template>
  <div v-if="isFetched">
    <p>{{ getAnswer }}</p>
    <ul :v-if="getBoard.length > 0">
      <li v-for="(item, index) in getBoard" :key="index">[  {{ item }}  ]</li>
    </ul>
    <form @submit.prevent="onGuess(guess)">
      <input v-model="gameStore.guess" class="bg-gray-200 rounded m-4 p-2 text-gray-700 uppercase" maxlength="5">
      <button>Click me</button>
    </form>
  </div>
</template>
