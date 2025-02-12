<template>
  <RouterView/>
</template>

<script setup lang="ts">
import { initSocket } from './socket.ts'
import {ref} from "vue";

initSocket()
</script>
<style scoped>

</style>
