<template>
<div>
  <button @click="createRoom">Новая комната</button>
  &nbsp;
  <button>Присоединиться к существующей</button>
</div>
</template>
<script setup lang="ts">
import {getUUID} from "@/helpers/helpers.ts";
import {socket} from "@/socket.ts";

const createRoom = () => {
  const uid = getUUID();
  socket.emit('createRoom', '5991083c-67a3-4fff-abfd-b74efba33b3b');
}

</script>
<style scoped>

</style>