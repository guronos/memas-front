import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {IRoomData, TUsersData} from "@/types/storeTypes/storeTypes.ts";
import { StatusRoom } from '@/enums/StatusRoom'

export const useRoomStore = defineStore('roomStore', () => {
  const roomData = ref<IRoomData | null>(null)
  const usersInRoom = ref<Record<string, TUsersData>>({})

  const getRoomData = computed<IRoomData | null>(() => roomData.value)
  const getUsersInRoom = computed<Record<string, TUsersData>>(() => usersInRoom.value)
  const setStatus = (status: StatusRoom) => {
    if (roomData.value) roomData.value.status = status
  }

  const setNewConnected = (baseRoomData: IRoomData) => {
    console.log('setNewConnected', baseRoomData)
    usersInRoom.value = baseRoomData.usersData
    roomData.value = {
      ...baseRoomData
    }
  }
  const setUsersInRoom = (newUserData: TUsersData) => {
    console.log('setUsersInRoom', newUserData)
    usersInRoom.value = newUserData.usersData
    usersInRoom.value.socketIds = newUserData.socketIds
  }

  return {
    roomData,
    setNewConnected,
    getRoomData,
    getUsersInRoom,
    setUsersInRoom,
    setStatus
  }
})
