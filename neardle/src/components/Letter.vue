<script setup>
import { computed } from 'vue'
  const props = defineProps({
    letter: String,
    distance: Number,
    dummy: Boolean
  })

  const colourRange = {
    start: { h: 10, s: 100, l: 50 }, // red
    end: { h: 109, s: 60, l: 50 } // green
  }

  // s: +50 for colourblind mode

  // calculate style from distance, or dummy
  const dynamicStyle = computed(() => {
    if (props.dummy) {
      return props.letter == "|" ? "color:white;" : "";
    } else {
      let range = colourRange.end.h - colourRange.start.h;
      let percent = 1-(props.distance / 25);
      return hsl_col_perc(percent, colourRange.start, colourRange.end);
    }
  })

  // build style string by property
  const hsl_col_perc = (percent, start, end) => {

    // same calc for each value
    let h = hsl_var(percent, start.h, end.h);
    let s = hsl_var(percent, start.s, end.s);
    let l = hsl_var(percent, start.l, end.l);

    // calculate colour & opacity
    let col = 'hsla('+h+','+s+'%,'+l+'%,1)';
    let str = 'background-color:' + col + ';border: 4px solid '

    // add border if correct
    str += (percent == 1) ? "black;" : "hsla(0,0%,0%,0);";
    if (percent == 1) str += " font-weight:bold;";
    return str
  }

  // save some repetition time
  const hsl_var = (percent, start, end) => {
      return ((end - start) * percent) + start;
  }
  
</script>

<template>
  <li class="inline-block">
    <!-- real letter -->
    <div v-if="!props.dummy">
      <div class="w-12 py-2 text-xl m-1 rounded-md box-border border-4 border-white;" :style="`${dynamicStyle}`">{{ letter }}</div>
    </div>
    <!-- placeholder -->
    <div v-else>
      <div class="inline-block w-12 py-2 text-xl m-1 rounded-md box-border border-[4px] border-slate-100" :style="`${dynamicStyle}`">{{letter}}</div>
    </div>
  </li>
</template>