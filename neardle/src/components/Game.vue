<script setup>
  import { watch, ref } from 'vue' 
  import { storeToRefs } from 'pinia'
  import { useGameStore } from '../stores/game-store'

  // props
  const { getAnswer, getBoard, isFetching } = storeToRefs(useGameStore());
  
  // methods
  const { fetchWordList, guessWord } = useGameStore();

  const addGuess =(e) => {

    console.log('guess')
    const rguess = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    guessWord(rguess.toUpperCase());

  }

  // create
  fetchWordList();
</script>

<template>
  <div>
    <p>{{ getAnswer }}</p>
    <ul :v-if="getBoard.length > 0">
      <li v-for="(item, index) in getBoard" :key="index">[  {{ item }}  ]</li>
    </ul>
    <button @click.prevent="addGuess">Click me</button>
  </div>
</template>
