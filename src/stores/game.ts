import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {IGameData} from "@/types/storeTypes/storeTypes.ts";
import type { StatusRoom } from '@/enums/StatusRoom';
import type { GameEvent } from '@/enums/GameEvent';

export const useGameStore = defineStore('gameStore', () => {
    const gameData = ref<IGameData | null>(null)

    const getGameData = computed(() => gameData.value)

    const setGameBaseData = (data: IGameData) => {
        gameData.value = data
    }

    const setGameImageData = (imageSelected: Record<string, string>) => {
        console.log('imageSelected', imageSelected)
        gameData.value!.imageSelected = imageSelected
    }
    const setGameEvent = (gameEvent: GameEvent) => gameData.value!.gameEvent = gameEvent

    return {
        gameData,
        getGameData,
        setGameBaseData,
        setGameImageData,
        setGameEvent
    }
})
