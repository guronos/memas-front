import { ref, computed, type Ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import { getFetch } from '@/helpers/helpers'
import type { I_UserData } from '@/types/user/userTypes.ts'

export const useMainStore = defineStore('mainState', () => {
    const authState = ref(false)
    const getAuthState = computed(() => authState.value)
    const setAuthState = (state: boolean) => {
        authState.value = state
    }
    const checkAuthState = async () => {
        try {
            const isAuth = await getFetch('/api/v1/auth/check', {})
            if (isAuth.statusCode === 200) {
                setUserData({ userId: isAuth.userId })
                return isAuth
            } else return false
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const userData = ref<I_UserData>({})
    const setUserData = (userDataObj: {}) => {
        userData.value = userDataObj
    }

    return { userData, setUserData, getAuthState, checkAuthState, setAuthState }
})
