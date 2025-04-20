<template>
  <div class="px-10">
    <div v-if="$gameStore.getGameData && $roomStore.getRoomData">
      <div class="question">
        {{$gameStore.getGameData.question.value}}
      </div>
      <div class="spacer"></div>
      <div class="images">
        <div 
          v-for="image in $gameStore.getGameData.userImages[$mainStore.userData.userId]" 
          :key="image" 
          :class="['image-container', 
          { selected: selectedImage === image, 
          disabled_light: selectedImage && selectedImage !== image }]"
          @click="!confirmSelectImage && selectImage(image)"
          style="position: relative;"
        >
          <img :src="serverURL+'/memImage/'+image" class="image">
          <div class="confirm-container">
            <div v-if="selectedImage === image && !confirmSelectImage" class="d-flex flex-column justify-center align-center">
              <v-btn class="confirm-button" @click="confirmSelection">Подтвердить</v-btn>
                <div class="confirm-arrow"></div>
            </div>
              <v-icon 
              v-if="selectedImage === image && confirmSelectImage" 
              style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; color: green; font-size: 2rem;">
              mdi-check-circle
            </v-icon>
          </div>
        
        </div>
      </div>
    </div>
    <div>
      <div v-if="$roomStore.getRoomData && !$gameStore.getGameData?.round" class="d-flex flex-column ga-4 align-center w-100">
        <div class="d-flex justify-center align-center ga-3">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
        <span>
          Ожидание участников...
        </span>
        </div>
        <div class="d-flex ga-4 align-center w-100">
        Ссылка для участников:
        <v-text-field 
          :model-value="$route.fullPath"
          variant="outlined"
          hide-details
          density="compact"
          readonly
        />
        </div>
        
      </div>
      <div class="d-flex ">
        <div class="info">
        <div>Подключенные пользователи:</div>
        <div 
        v-for="(userEl) in $roomStore.getUsersInRoom" 
        :key="userEl.socketId"
        class="d-flex align-center ga-1"
        >
          <div v-if="$gameStore.getGameData && $gameStore.getGameData.imageSelected && $gameStore.getGameData.imageSelected[userEl.id]">
              <v-icon>
                mdi-check-circle
              </v-icon>
          </div>
          <div>{{ userEl.email }}</div>
          <v-icon v-if="$roomStore.getRoomData?.ownerUserId === userEl.id">
                mdi-crown
          </v-icon>
        </div>
      </div>
      <div v-if="$roomStore.roomData?.selectedImage" class="w-100 d-flex justify-center">
        <div v-for="(selectImageByUser, userId) in $roomStore.roomData.selectedImage[$gameStore.gameData?.round]" 
        :key="userId"
        class="d-flex flex-column align-center"
        >
          <div class="text-h5">{{ getUserById[userId].firstName }}</div>
          <img :src="serverURL+'/memImage/'+selectImageByUser" class="image _show">
        </div>
      </div>
      </div>
    </div>
    <v-btn 
      v-if="
      $roomStore.getRoomData?.owner === $roomStore.getRoomData?.socketId && 
      !$gameStore.getGameData?.round" 
      class="mt-4" 
      @click="startGame"
    >Начать</v-btn>
    <v-btn 
      v-if="
      !!$gameStore.getGameData?.round && 
      $roomStore.getRoomData?.owner === $roomStore.getRoomData?.socketId &&
      $gameStore.getGameData.gameEvent !== GameEvent.showImages"  
      class="mt-4"
      @click="showCards"
    >Завершить раунд</v-btn>
    <v-btn 
      v-if="
      !!$gameStore.getGameData?.round && 
      $roomStore.getRoomData?.owner === $roomStore.getRoomData?.socketId &&
      $gameStore.getGameData.gameEvent === GameEvent.showImages"  
      class="mt-4"
      @click="nextRound"
    >Продолжить игру</v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {socket} from "@/socket.ts";
import {useRoomStore} from "@/stores/room.ts";
import {computed, ref, watch} from "vue";
import {serverURL} from "@/constants/connectConstants.ts";
import {useGameStore} from "@/stores/game.ts";
import type {IGameData} from "@/types/storeTypes/storeTypes.ts";
import { StatusRoom } from '@/enums/StatusRoom';
import { GameEvent } from '@/enums/GameEvent';
import { useMainStore } from '@/stores/mainState';

const $route = useRoute()
const $roomStore = useRoomStore()
const $gameStore = useGameStore()
const confirmSelectImage = ref(false)
const $mainStore = useMainStore()

const startGame = () => {
  if ($roomStore.getRoomData) {
    socket.emit('startGame', {
      roomUid: $roomStore.getRoomData.roomUid,
      roomName: $roomStore.getRoomData.roomName
    });
  }
}

const selectedImage = ref<string | null>(null);

const selectImage = (image: string) => {
  selectedImage.value = image;
};

const confirmSelection = () => {
  if (selectedImage.value) {
    confirmSelectImage.value = true
    // todo доделать экшн
    socket.emit('imageSelected', {
      roomUid: $roomStore.getRoomData!.roomUid,
      round: $gameStore.getGameData!.round,
      selectedImage: selectedImage.value,
    });
    console.log('Image selected:', selectedImage.value);
  }
};

socket.on('gameAction', async (eventData) => {
  console.log('gameAction', eventData)
  if (eventData.gameData.gameEvent === GameEvent.beginGame) {
    $gameStore.setGameBaseData({
        question: eventData.gameData.question, 
        userImages: eventData.gameData.userImages,
        round: eventData.gameData.round
      } as IGameData)
    $roomStore.setStatus(StatusRoom.inProcess)
    // question
    // userImages
  } else if (eventData.gameData.gameEvent === GameEvent.selectImage) {
    $gameStore.setGameImageData(eventData.gameData.imageSelected)
  } else if (eventData.gameData.gameEvent === GameEvent.showImages) {
    console.log('show')
  }

  // image.value = `data:image/jpeg;base64,${eventData.gameData.img}`;
});

const showCards = () => {
  socket.emit('showImages', $roomStore.getRoomData!.roomUid)
}

const nextRound = () => {
  // TODO доделать бэк
  socket.emit('nextRound', $roomStore.getRoomData!.roomUid)
}

const getUserById = computed(() => {
  const users: Record<string, any> = {}
  if ($roomStore.roomData?.usersData) {
    const usersInStore = $roomStore.roomData.usersData
      for (const key in usersInStore) users[usersInStore[key].id] = usersInStore[key]
  }
  return users
})

watch(() => $gameStore.getGameData?.imageSelected, (newVal: Record<string, string> | undefined) => {
  if ($mainStore.userData?.userId && newVal?.[$mainStore.userData.userId]) {
    selectedImage.value = newVal?.[$mainStore.userData.userId]
    confirmSelectImage.value = true
  }
});

(function () {
  const roomId = $route.params.roomId
  if (roomId && !$roomStore.getRoomData) {
    socket.emit('joinRoom', roomId);
  }
  console.log($route, $roomStore.getRoomData)
}())
</script>

<style scoped>
.question {
  background-color: #5f9ea0;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 8px;
  margin-bottom: 20px;
}

.spacer {
  flex-grow: 1;
}

.images {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px 0;
}

.image-container {
  position: relative;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.image-container:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-container.selected {
  outline: 4px solid #5f9ea0;
  border-radius: 8px;
}

.image-container.disabled_light {
  opacity: 0.5;
}

.image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 0 10px;
}
.image._show {
  width: 250px;
  height: 250px;
}

.confirm-container {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.confirm-arrow {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #6200ea;
  margin-top: 5px;
}

.confirm-button {
  background-color: #6200ea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #3700b3;
}
</style>