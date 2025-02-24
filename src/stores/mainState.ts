import { ref, computed, type Ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import { getFetch } from '@/helpers/helpers'
import type { I_UserData } from '@/types/user/userTypes.ts'
import {useRouter} from "vue-router";

export const useMainStore = defineStore('mainState', () => {
    const $router = useRouter()

    const messageData = ref('')
    const authState = ref(false)
    const getAuthState = computed(() => authState.value)
    const setAuthState = (state: boolean) => {
        authState.value = state
    }
    const checkAuthState = async () => {
        try {
            const isAuth = await getFetch('auth/check', {})
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
    const setUserData = (userDataObj: {userId: number}) => {
        userData.value = userDataObj
    }

    const getMessageData = computed(() => {
        return messageData.value
    })
    const setMessageData = (message: string) => {
        messageData.value = message
    }

    const logout = async () => {
        await getFetch('auth/logout')
        userData.value = {}
        await $router.push('/login')
    }

    return {
        userData,
        setUserData,
        getAuthState,
        checkAuthState,
        setAuthState,
        getMessageData,
        setMessageData,
        logout
    }
})
