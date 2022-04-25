<script setup>
  import { useGameStore } from '../stores/game-store'
  const store = useGameStore();
</script>

<template>
  <ul id="game-board" :v-if="store.board.length > 0">
    <li v-for="(item, index) in store.board" :key="index">[  {{ item }}  ]</li>
  </ul>
</template>