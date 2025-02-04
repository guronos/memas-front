<template>
<div>
  комната {{ $route.params.roomId }}
  <button>Начать</button>
</div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const $route = useRoute()
</script>
<style scoped>

</style>