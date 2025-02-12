import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {IGameData} from "@/types/storeTypes/storeTypes.ts";

export const useGameStore = defineStore('gameStore', () => {
    const gameData = ref<IGameData | null>(null)

    const getGameData = computed(() => gameData.value)

    const setGameBaseData = (data: IGameData) => {
        gameData.value = data
    }

    return {
        gameData,
        getGameData,
        setGameBaseData,
    }
})
