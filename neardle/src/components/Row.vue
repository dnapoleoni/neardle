<script setup>
  import { computed } from 'vue'
  import Letter from '../components/Letter.vue'
  
  const props = defineProps({
    letters: String
  })

  const letterArray = computed(() => props.letters.split(""));
</script>

<template>
  <li>
    <Letter v-for="(item, index) in letterArray" :key="index" :letter="item" />
  </li>
  
</template>