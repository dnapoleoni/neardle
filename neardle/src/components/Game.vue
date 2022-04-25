<script setup>
  import { watch, ref } from 'vue' 
  import { storeToRefs } from 'pinia'
  import { useGameStore } from '../stores/game-store'
  import { GameLogic }  from '../logic/game-logic'

  // objects
  const store = useGameStore();
  const logic = new GameLogic();

  //
  logic.fetchWordList().then(() => {

    // update store
    store.$patch((state) => {
      state.answer = logic.todaysWord;
      state.board = logic.gameBoard;
      state.fetched = logic.fetched;
      state.new = logic.newGame;
    })
  })

  const onGuessClick = (e) => {

    // first, check length
    if (logic.isValidLength(store.guess)) {

      // check if valid word
      if (logic.isValidWord(store.guess)) {

        // guess it
        logic.guessWord(store.guess);
        store.guess = "";
      } else{
        // ERROR
        console.log("invalid word")
      }
    } else {
      // ERROR
      console.log("word length incorrect")
    }
  }
</script>

<template>
  <div v-if="store.fetched">
    <!-- <p>{{ store.answer }}</p> -->
    <form @submit.prevent="onGuessClick(store.guess)">
      <input v-model="store.guess" class="bg-gray-200 rounded m-4 p-2 text-gray-700" maxlength="5">
      <button>Click me</button>
    </form>
    <ul :v-if="store.board.length > 0">
      <li v-for="(item, index) in store.board" :key="index">[  {{ item }}  ] ({{ logic.getDistance(item, logic.MODE_TOTAL) }})</li>
    </ul>
    
  </div>
</template>
