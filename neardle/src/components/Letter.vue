<script setup>
  const props = defineProps({
    letter: String
  })
</script>

<template>
  <div class="inline-block">{{ letter }}</div>
</template>