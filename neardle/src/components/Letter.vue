<script setup>
import { computed } from 'vue'
  const props = defineProps({
    letter: String,
    distance: Number,
    dummy: Boolean
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
  const dynamicStyle = computed(() => {
    if (props.dummy) {
      return props.letter == "." ? "color:white;" : "";
    } else {
      let range = colours.end.h - colours.start.h;
      let percent = 1-(props.distance / 25);
      return hsl_col_perc(percent, colours.start, colours.end);
    }
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
    let str = 'background-color:hsla('+h+','+s+'%,'+l+'%,'+(percent+0.25)+');';

    // add border if correct
    if (percent == 1) str += "border: 3px solid #333333;" 
    return str
  }
  
</script>

<template>
  <li class="inline-block">
    <!-- real letter -->
    <div v-if="!props.dummy">
      <div class="w-12 py-2 text-xl m-1 rounded-md box-border" :style="`${dynamicStyle}`">{{ letter }}</div>
    </div>
    <!-- placeholders -->
    <div v-else>
      <div class="inline-block w-12 py-2 text-xl m-1 rounded-md box-border border-[3px] border-gray" :style="`${dynamicStyle}`">{{letter}}</div>
    </div>
  </li>
</template>