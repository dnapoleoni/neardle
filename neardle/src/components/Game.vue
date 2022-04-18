<script setup>
  import { storeToRefs } from 'pinia'
  import { useGameStore } from '../stores/game-store'

  // props
  const { answer, isFetching } = storeToRefs(useGameStore())
  
  // methods
  const { fetchWordList } = useGameStore()

  // create
  fetchWordList();
</script>

<template>
  <p>{{ answer }}</p>
</template>
