<script setup>

import { BackspaceIcon } from '@heroicons/vue/outline'
import { PlusIcon } from '@heroicons/vue/outline'

  // components
  const props = defineProps({

  })

  //
  const inputs = ["QWERTYUIOP", "ASDFGHJKL", ">ZXCVBNM<"];

</script>

<template>
  <div class="max-w-xl">
    <div v-for="(item, index) in inputs" :key="index">
      <div class="inline-block box-border w-[10%] px-1 cursor-pointer" v-for="(sub, subindex) in item.split('')" :key="subindex">
        <div @click="$emit('input', sub)" class="text-slate-500 font-bold">
          <div v-if="sub == '<'">
          <BackspaceIcon class="h-6 w-6 translate-x-4 translate-y-[6px]"/>
          </div>
          <div class="inline-block translate-x-[-16px] md:translate-x-[-6px]" v-else-if="sub == '>'">
            ENTER
          </div>
          <div class="mx-2 py-4" v-else>
            {{ sub }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>