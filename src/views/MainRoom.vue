<template>
<div>
  комната {{ $route.params.roomId }}
</div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const $route = useRoute()
</script>
<style scoped>

</style>