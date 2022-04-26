<script setup>
    // components
  import { computed } from 'vue'
  import Row from '../components/Row.vue'
  import Letter from '../components/Letter.vue'
  const props = defineProps({
    board:Array,
    guess:String
  })

  const dummyLetterArray = computed(() => {
    var blank = new Array(5).fill(".");
    var join = props.guess.split("").concat(blank);
    var end = join.slice(0,5);
    return end;
  });
</script>

<template>
  <div class="">
    <!-- actual board -->
    <Row :v-if="props.board.length > 0" v-for="(item, index) in props.board" :key="index" :letters="item" />

    <!-- dummy board to fill -->
    <ul><Letter v-for="(item, index) in dummyLetterArray" :key="index" :dummy="true" :letter="item"/></ul>
    
  </div>
</template>