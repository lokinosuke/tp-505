import { useSession } from '../stores/session.js'

export const BASE_URL = 'https://127.0.0.1:8000/api'

export async function api (url, params = {}) {
    const session = useSession()

    params = Object.assign({
        mode: 'cors',
        cache: 'no-cache',
    }, params)

    if (session.currentToken !== null)
    params.headers = Object.assign({
        Authorization: `Bearer ${session.currentToken}`,
    }, params.headers);

    if (params.method == "PATCH") {
        params.headers = Object.assign({
            'Content-Type':'application/merge-patch+json'

        }, params.headers)
    } else {
        params.headers = Object.assign({
            'Content-Type':'application/json'

        }, params.headers)
    }
    let response = await fetch(BASE_URL + url, params)
    let json = await response.json() || {}
    if (!response.ok){
        let errorMessage = json.error || response.status
        throw new Error(errorMessage)
    }
    return json
}