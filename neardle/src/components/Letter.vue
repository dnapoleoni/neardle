<script setup>
import { computed } from 'vue'
  const props = defineProps({
    letter: String,
    distance: Number
  })

  const colours = {
    start: {
      h: 0, s: 50, l: 50
    },
    end: {
      h: 115, s: 29, l: 53
    }
  }

  // calculate distances
  const distanceStyle = computed(() => {
    let range = colours.end.h - colours.start.h;
    let percent = 1-(props.distance / 25);
    return hsl_col_perc(percent, colours.start, colours.end);
  })

  // save repetition
  const hsl_var = (percent, start, end) => {
      return ((end - start) * percent) + start;
  }

  // build style string
  const hsl_col_perc = (percent, start, end) => {
    let h = hsl_var(percent, start.h, end.h);
    let s = hsl_var(percent, start.s, end.s);
    let l = hsl_var(percent, start.l, end.l);

    // calculate colour & opacity
    let str = 'background-color:hsla('+h+','+s+'%,'+l+'%,'+percent+');';

    // add border if correct
    if (percent == 1) str += "border: 2px solid #333333;" 
    return str
  }
</script>

<template>
  <div class="inline-block w-12 py-2 text-xl m-1 rounded-md box-border" :style="`${distanceStyle}`">{{ letter }}</div>
</template>