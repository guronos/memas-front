<template>
<div>
  комната {{ $roomStore.getRoomData }}
  <button @click="startGame">Начать</button>
  <div class="image" :style="`background-image: url('${image}')`"></div>
</div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import {socket} from "@/socket.ts";
import {useRoomStore} from "@/stores/room.ts";
import {ref} from "vue";
import {serverURL} from "@/constants/connectConstants.ts";

const $route = useRoute()
const $roomStore = useRoomStore()
const image = ref()

const startGame = () => {
  socket.emit('startGame', {
    roomUid: $roomStore.getRoomData.roomUid,
    roomName: $roomStore.getRoomData.roomName
  });
}

socket.on('gameAction', async (eventData) => {
  console.log('startGame', eventData)
  const imgData = await fetch(serverURL + `/images`, { body: {roomUid: $roomStore.roomData.roomUid}})
  // image.value = `data:image/jpeg;base64,${eventData.gameData.img}`;
});
</script>
<style scoped>
.image {
  width: 400px;
  height: 300px;
}
</style>