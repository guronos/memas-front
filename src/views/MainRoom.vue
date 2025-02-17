<template>
<div>
  <div v-if="$gameStore.getGameData && $roomStore.getRoomData">
    <div style="background-color: rgba(95,158,160,0.21)">
      {{$gameStore.getGameData.question.value}}
    </div>
    <div>
      <div v-for="image in $gameStore.getGameData.userImages[$roomStore.getRoomData.socketId]">
        <img :src="serverURL+'/memImage/'+image" width="300">
      </div>
    </div>
  </div>
  комната {{ $roomStore.getRoomData }}
  <v-btn @click="startGame">Начать</v-btn>
</div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import {socket} from "@/socket.ts";
import {useRoomStore} from "@/stores/room.ts";
import {ref} from "vue";
import {serverURL} from "@/constants/connectConstants.ts";
import {useGameStore} from "@/stores/game.ts";
import type {IGameData} from "@/types/storeTypes/storeTypes.ts";


const $route = useRoute()
const $roomStore = useRoomStore()
const $gameStore = useGameStore()

const startGame = () => {
  if ($roomStore.getRoomData) {
    socket.emit('startGame', {
      roomUid: $roomStore.getRoomData.roomUid,
      roomName: $roomStore.getRoomData.roomName
    });
  }
}

socket.on('gameAction', async (eventData) => {
  console.log('gameAction', eventData)
  if (eventData.gameData.type === 'beginGame') {
    $gameStore.setGameBaseData({question: eventData.gameData.question, userImages: eventData.gameData.userImages} as IGameData)
    // question
    // userImages
  }

  // image.value = `data:image/jpeg;base64,${eventData.gameData.img}`;
});
</script>
<style scoped>
.image {
  width: 400px;
  height: 300px;
}
</style>