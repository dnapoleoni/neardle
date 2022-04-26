<script setup>

  // components
  import BlankRow from './BlankRow.vue'
  const props = defineProps({
    rows:Number,
    letters: Number
  })
</script>

<template>
  <ul>
    <BlankRow v-for="index in props.rows" :key="index" :letters="props.letters" />
  </ul>
</template>