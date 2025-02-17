<template>
<div class="d-flex justify-center align-center" style="height: 100vh">
  <div class="w-66">
    <TheInput
        v-model="roomName"
    />
    <v-btn @click="createRoom">Новая комната</v-btn>
    &nbsp;
    <TheInput
        v-model="joinRoomId"
    />
    <v-btn @click="joinRoom">Присоединиться к существующей</v-btn>
  </div>
</div>
</template>
<script setup lang="ts">
import {getUUID} from "@/helpers/helpers.ts";
import {socket} from "@/socket.ts";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {useRoomStore} from "@/stores/room.ts";
import TheInput from "@/components/TheInput.vue";

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