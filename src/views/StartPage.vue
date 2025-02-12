<template>
<div>
<input type="text" @input="roomName = ($event.target as HTMLInputElement).value">
  <button @click="createRoom">Новая комната</button>
  &nbsp;
  <input type="text" @input="joinRoomId = ($event.target as HTMLInputElement).value">
  <button @click="joinRoom">Присоединиться к существующей</button>
</div>
</template>
<script setup lang="ts">
import {getUUID} from "@/helpers/helpers.ts";
import {socket} from "@/socket.ts";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {useRoomStore} from "@/stores/room.ts";

const $router = useRouter()
const $roomStore = useRoomStore()

const joinRoomId = ref('')
const roomName = ref('')
const createRoom = () => {
  socket.emit('createRoom', { roomName: roomName.value });
  // socket.emit('events', { test: '42' })
}
const joinRoom = () => {
  console.dir(joinRoomId.value)
  socket.emit('joinRoom', joinRoomId.value);
}
socket.on('joinRoom', (e) => {
	console.log('joinRoom', e, socket)
  $router.push(`/${e.roomData.roomUid}`)
  $roomStore.setNewConnected(e.roomData)
	// io.in("5991083c-67a3-4fff-abfd-b74efba33b3b").emit("eventsRoom", () => {
	// 	console.log('Job')
	// });
})
socket.on('joinedUser', (e) => {
  console.log('joinedUser', e)
  $roomStore.setUsersInRoom(e)
})
</script>
<style scoped>

</style>