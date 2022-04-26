<script setup>

  // logic
  import { ref, onMounted } from 'vue';
  import { useGameStore } from '../stores/game-store'
  import { GameLogic }  from '../logic/game-logic'

  // components
  import Board from './Board.vue'
  import Letter from './Letter.vue'
  import BlankBoard from './BlankBoard.vue'
  import Keyboard from './Keyboard.vue'

  // objects
  const store = useGameStore();
  const logic = new GameLogic();
  const input = ref(null)

  // get data
  onMounted(() => {
    logic.fetchWordList().then(() => {
      console.log('READY');

      input.value.focus();
    })

    return input
  })

  const onKeyboardClick = (value) => {

    if (value == "<") {

      store.guess = store.guess.slice(0, -1); 

    } else if (value == ">") {
      
      logic.submitGuess(store.guess);
    } else {
      
      if (store.guess.length < 5) store.guess += value;
    }
  }
</script>

<template>
  <div v-if="store.fetched" class="relative h-screen">

    <!-- deprecated mode toggle -->
    <!-- <button class="px-2 absolute right-0 top-0" @click.prevent="logic.toggleMode()">{{ store.mode }}</button> -->

    <!-- top menu -->
    <div class="px-10 py-4 text-2xl font-fancy font-bold">
      Neardle
    </div>

    <!-- temp input -->
    <form @submit.prevent="logic.submitGuess(store.guess)" class="hidden md:block">
      <input ref="input" v-model="store.guess" class="bg-gray-200 rounded m-2 mb-4 p-2 text-gray-700" maxlength="5">
      <button class="border-2 px-2 py-1 rounded border-gray-800">Guess</button>
    </form>

    <!-- output -->
    <div >
      <!-- game board -->
      <Board class="z-2 absolute m-auto left-0 right-0" :board="store.board" :guess="store.guess" />

      <!-- dummy board bg -->
      <BlankBoard class="absolute m-auto left-0 right-0 z-[-10]" :rows="6" :letters="5" />
    </div>
    
    <!-- input -->
    <div >
      <Keyboard @input="onKeyboardClick" class="fixed m-auto left-0 right-0 bottom-0 md:bottom-2 p-2 bg-slate-100 w-screen"/>
    </div>
  </div>
</template>
