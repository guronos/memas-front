<script setup lang="ts">
import { initSocket } from './socket.ts'
import {ref} from "vue";

initSocket()
</script>
<template>
  <RouterView/>
</template>

<style scoped>

</style>
