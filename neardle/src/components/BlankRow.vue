<script setup>

  // components
  import Letter from './Letter.vue'
  const props = defineProps({
    letters: Number
  })
</script>

<template>
  <div>
      <Letter v-for="index in props.letters" :key="index" :dummy="true" :letter="`|`" />
  </div>
</template>