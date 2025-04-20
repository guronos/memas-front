import { v4 as uuidv4 } from 'uuid';
import {API} from "@/constants/connectConstants.ts";
import {useMainStore} from "@/stores/mainState.ts";
import {onMounted, ref} from "vue";

export const errorMessage = ref('')
export const rmMessage = () => errorMessage.value = ''

export const getUUID = () => uuidv4()

export const getFetch = async (
    endpoint: string,
    payload: object | false = false,
    method = 'GET'
): Promise<any> => {
    // Если нужна поддержка queryParams
    // if (payload.filter) {
    //   const query = {}
    //   query.filter = _.cloneDeep(payload.filter)
    //   delete payload.filter
    //   if (!Object.keys(payload).length) payload = false
    //   if (Object.keys(query)) endpoint = setQueryParams(query, endpoint)
    // }
    console.log(API)
    if (payload && method === 'GET') method = 'POST'
    const headers = new Headers()
    headers.append('Access-Control-Allow-Credentials', 'include')
    headers.append('Access-Control-Allow-Origin', 'http://localhost:5173')
    headers.append('Content-Type', payload ? 'application/json;charset=utf-8' : 'text/plain')
    const options: RequestInit = {
        method: method.toUpperCase(),
        credentials: 'include',
        headers,
        // credentials: 'include',
        body: payload ? JSON.stringify(payload) : undefined
    }
    try {
        const rawData = await fetch(API + endpoint, options)
        // if (rawData.status === 401) useMainStore().setAuthState(false)
        const data = await rawData.json()
        if (data.statusCode !== 200 && data.message) errorMessage.value = data.message
        return data
    } catch (error) {
        console.error(error)
        // errorMessage.value = error
    }

}