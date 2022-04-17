<script setup>
  import { storeToRefs } from 'pinia'
  import { useDummyData } from '../stores/dummy'

  // props
  const { foo, fetching } = storeToRefs(useDummyData())
  
  // methods
  const { fetchLocalData } = useDummyData()

  // create
  fetchLocalData();
</script>

<template>
  <p>{{ foo }}</p>
</template>
