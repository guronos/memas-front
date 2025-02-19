import { v4 as uuidv4 } from 'uuid';

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
    const rawData = await fetch(endpoint, options)
    // if (rawData.status === 401) useMainStore().setAuthState(false)
    return await rawData.json()
}