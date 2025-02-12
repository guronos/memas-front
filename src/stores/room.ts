import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {IRoomData, TUsersData} from "@/types/storeTypes/storeTypes.ts";

export const useRoomStore = defineStore('roomStore', () => {
  const roomData = ref<IRoomData | null>(null)
  const usersInRoom = ref<TUsersData[]>([])

  const getRoomData = computed<IRoomData | null>(() => roomData.value)
  const getUsersInRoom = computed<TUsersData[]>(() => usersInRoom.value)

  const setNewConnected = (baseRoomData: IRoomData) => {
    roomData.value = {
      ...baseRoomData
    }
  }
  const setUsersInRoom = (newUserData: TUsersData) => {
    usersInRoom.value.push(newUserData)
  }

  return {
    roomData,
    setNewConnected,
    getRoomData,
    getUsersInRoom,
    setUsersInRoom
  }
})
