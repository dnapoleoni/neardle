<script setup>
  import { computed } from 'vue'
  
  // components
  import Row from './Row.vue'
  import Letter from './Letter.vue'
  
  const props = defineProps({
    board:Array,
    guess:String
  })

  // fill empty slots for dummy letters
  const dummyLetterArray = computed(() => {
    var blank = new Array(5).fill("|");
    var join = props.guess.split("").concat(blank);
    var end = join.slice(0,5);
    return end;
  });

</script>

<template>
  <div >
    <!-- actual board -->
    <Row :v-if="props.board.length > 0" v-for="(item, index) in props.board" :key="index" :letters="item" />

    <!-- dummy board to fill -->
    <ul><Letter v-for="(item, index) in dummyLetterArray" :key="index" :dummy="true" :letter="item"/></ul>
    
  </div>
</template>