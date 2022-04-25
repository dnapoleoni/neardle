<script setup>
  import { computed } from 'vue'
  import { useGameStore } from '../stores/game-store'
  import Letter from '../components/Letter.vue'
  
  const store = useGameStore();
  const props = defineProps({
    letters: String
  })

  const letterArray = computed(() => props.letters.split(""));

  const getDistance = (index) => {
    const dis = store.distance(props.letters);
    return store.mode == "total" ? dis : dis[index];
  }
</script>

<template>
  <li>
    <Letter v-for="(item, index) in letterArray" :key="index" :letter="item" :distance="getDistance(index)" />
  </li>
</template>