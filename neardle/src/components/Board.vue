<script setup>
    // components
  import Row from '../components/Row.vue'
  const props = defineProps({
    board:Array
  })
</script>

<template>
  <ul id="game-board" :v-if="props.board.length > 0">
    <Row v-for="(item, index) in props.board" :key="index" :letters="item" />
  </ul>
</template>