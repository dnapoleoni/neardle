<script setup>

  // components
  const props = defineProps({

  })

  //
  const inputs = ["QWERTYUIOP", "ASDFGHJKL", ">ZXCVBNM<"];

</script>

<template>
  <div class="max-w-xl">
    <div v-for="(item, index) in inputs" :key="index">
      <div class="inline-block box-border w-[10%] px-1" v-for="(sub, subindex) in item.split('')" :key="subindex">
        <div class="mx-2 py-4">{{ sub }}</div>
      </div>
    </div>
  </div>
</template>