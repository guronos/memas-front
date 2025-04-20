<template>
  <v-app>
    <v-snackbar
        :model-value="!!errorMessage"
        multi-line
        :timeout="4000"
        color="error"
        variant="tonal"
        location="top"
    >
      {{ errorMessage }}
      <template v-slot:actions>
        <v-btn
            icon="mdi-close"
            variant="text"
            @click="rmMessage"
        />
      </template>
    </v-snackbar>
    <div class="d-flex justify-end align-center mx-12 my-2">
    <div class="w-50">Игра: {{ $roomStore.getRoomData?.roomName || 'Без названия' }}</div>
      <v-btn
        text="Выход"
        @click="$mainStore.logout"
      />
    </div>
    <RouterView/>
  </v-app>
</template>

<script setup lang="ts">
import { initSocket } from './socket.ts'
import {ref} from "vue";
import {useMainStore} from "@/stores/mainState.ts";
import {errorMessage, rmMessage} from "@/helpers/helpers.ts";
import {socket} from "@/socket.ts";
import { useRoomStore } from './stores/room.ts';
import { useRouter } from 'vue-router';
import { useGameStore } from './stores/game.ts';
import { StatusRoom } from './enums/StatusRoom.ts';
import type { IGameData } from './types/storeTypes/storeTypes.ts';
const $router = useRouter()

const $roomStore = useRoomStore()
const $mainStore = useMainStore()
const $gameStore = useGameStore()


initSocket()

socket.on('joinRoom', (e) => {
	console.log('joinRoom', e, socket)
  $router.push(`/${e.roomData.roomUid}`)
  $roomStore.setNewConnected(e.roomData)
  if (e.gameState) {
    $gameStore.setGameBaseData(e.gameState)
    $roomStore.setStatus(StatusRoom.inProcess)
  }
	// io.in("5991083c-67a3-4fff-abfd-b74efba33b3b").emit("eventsRoom", () => {
	// 	console.log('Job')
	// });
})
</script>
<style scoped>

</style>
