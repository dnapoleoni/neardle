<script setup>

  // logic
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia'
  import { useGameStore } from '../stores/game-store'
  import { GameLogic }  from '../logic/game-logic'

  // components
  import Board from '../components/Board.vue'

  // objects
  const store = useGameStore();
  const logic = new GameLogic();

  // input ref
  const input = ref(null);

  //
  onMounted(() => {
    logic.fetchWordList().then(() => {
      console.log('done outer');

      input.value.focus();
    })

    return { input }
  })
</script>

<template>
  <div v-if="store.fetched">
    <!-- <button class="px-2 absolute right-0 top-0" @click.prevent="logic.toggleMode()">{{ store.mode }}</button> -->
    <form @submit.prevent="logic.submitGuess(store.guess)">
      <input ref="input" v-model="store.guess" class="bg-gray-200 rounded m-4 p-2 text-gray-700" maxlength="5">
      <button class="border-2 px-2 py-1 rounded border-gray-800">Guess</button>
    </form>

    <Board :board="store.board" />
    
  </div>
</template>
