<script setup>
  import { computed } from 'vue'
  import { gsap } from 'gsap'
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

  const onEnter = (el, done) => {
    console.log("GSAP", el)
    gsap.from(el, {
      opacity: 0,
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