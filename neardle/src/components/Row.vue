<script setup>
  import { computed } from 'vue'
  import { gsap } from 'gsap'
  import { useGameStore } from '../stores/game-store'

  // components
  import Letter from './Letter.vue'
  
  const store = useGameStore();
  const props = defineProps({
    letters: String
  })

  // letter to v-for array
  const letterArray = computed(() => props.letters.split(""));

  // calculate values
  const getDistance = (index) => {
    const dis = store.distance(props.letters);
    return store.mode == "total" ? dis : dis[index];
  }

  // animation
  const onEnter = (el, done) => {
    gsap.from(el, {
      scaleY: 0,
      delay: el.dataset.index * 0.15,
      onComplete: done
    })
  }
</script>

<template>
  <TransitionGroup tag="ul" appear :css="false" @enter="onEnter">
    <Letter v-for="(item, index) in letterArray" :key="index" :letter="item" :distance="getDistance(index)" :data-index="index"/>
  </TransitionGroup>
</template>