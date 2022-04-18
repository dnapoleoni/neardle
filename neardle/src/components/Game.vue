<script setup>
  import { watch, ref } from 'vue' 
  import { storeToRefs } from 'pinia'
  import { useGameStore } from '../stores/game-store'

  // props
  const { getAnswer, getBoard, isFetching } = storeToRefs(useGameStore());
  
  // methods
  const { fetchGameData, guessWord, deleteWord } = useGameStore();

  // user input
  const addGuess = () => {

    // make random guess string
    const rguess = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    
    // push to state
    guessWord(rguess.toUpperCase());

  }

  // testing 
  const removeGuess = (str) => {
    deleteWord(str);
  }

  // create
  fetchGameData().then((e) => {
    console.log("INITIALISED")
  })
</script>

<template>
  <div>
    <p>{{ getAnswer }}</p>
    <ul :v-if="getBoard.length > 0">
      <li v-for="(item, index) in getBoard" :key="index">[  {{ item }}  ] <button @click="removeGuess(item)">(x)</button></li>
    </ul>
    <button @click.prevent="addGuess">Click me</button>
  </div>
</template>
