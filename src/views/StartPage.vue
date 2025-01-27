<template>
<div>
  <button @click="createRoom">Новая комната</button>
  &nbsp;
  <input type="text" @input="joinRoomId = $event.target.value">
  <button @click="joinRoom">Присоединиться к существующей</button>
</div>
</template>
<script setup lang="ts">
import {getUUID} from "@/helpers/helpers.ts";
import {socket} from "@/socket.ts";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter()
const joinRoomId = ref('')
const createRoom = () => {
  const uid = getUUID();
  socket.emit('createRoom', uid);
  // socket.emit('events', { test: '42' })
}
const joinRoom = () => {
  console.dir(joinRoomId.value)
  socket.emit('joinRoom', joinRoomId.value);
}
socket.on('joinRoom', (e) => {
	console.log('joinRoom', e, socket)
  $router.push(`/${e.id}`)
	// io.in("5991083c-67a3-4fff-abfd-b74efba33b3b").emit("eventsRoom", () => {
	// 	console.log('Job')
	// });
})
</script>
<style scoped>

</style>