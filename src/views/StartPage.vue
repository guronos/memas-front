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
import {ref, watch} from 'vue';
import { useRouter } from 'vue-router';
import {useRoomStore} from "@/stores/room.ts";
import TheInput from "@/components/TheInput.vue";

const $router = useRouter()
const $roomStore = useRoomStore()

const joinRoomId = ref('')
const roomName = ref('')
const createRoom = async () => {
  socket.emit('createRoom', { roomName: roomName.value });
  // await fetch(API + 'auth/check', {method: 'POST'})
  // socket.emit('events', { test: '42' })
}
const joinRoom = () => {
  console.dir(joinRoomId.value)
  socket.emit('joinRoom', joinRoomId.value);
}

socket.on('joinedUser', (e) => {
  console.log('joinedUser', e)
  $roomStore.setUsersInRoom(e)
  $roomStore.addUsers(e.usersData)
})
</script>
<style scoped>
.d-flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.align-center {
  align-items: center;
}
.w-66 {
  width: 66%;
  max-width: 500px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Добавим стили для кнопок */
v-btn {
  background-color: #6200ea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

v-btn:hover {
  background-color: #3700b3;
}

/* Стили для инпутов */
TheInput {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
</style>