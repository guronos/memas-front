<template>
  <v-text-field
    v-bind="$attrs"
    v-model="model"
    hide-details
    density="compact"
    :variant="'outlined'"
  />
</template>
<script setup lang="ts">
const model = defineModel()

</script>
<style scoped>

</style>