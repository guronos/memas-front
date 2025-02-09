import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('mainStore', () => {
  const roomData = ref(null)
  const usersInRoom = ref([])

  const getRoomData = computed(() => roomData.value)
  const getUsersInRoom = computed(() => usersInRoom.value)

  const setNewConnected = (baseRoomData) => {
    roomData.value = {
      ...baseRoomData
    }
  }
  const setUsersInRoom = (newUserData) => {
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
