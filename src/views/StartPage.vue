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
  socket.emit('createRoom', uid);
  // socket.emit('events', { test: '42' })
}
socket.on('createRoom', (e) => {
	console.log('createRoom', e, socket)
	// io.in("5991083c-67a3-4fff-abfd-b74efba33b3b").emit("eventsRoom", () => {
	// 	console.log('Job')
	// });
})
</script>
<style scoped>

</style>