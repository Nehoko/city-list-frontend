import {API_URI} from "./city-list-api";
import {User} from "../model/User";
import {storage} from "../utils/storage";
import {UserWithToken} from "../model/UserWithToken";

export async function login(user: User): Promise<UserWithToken> {
    return (await fetch(`${API_URI}/token`, {
        method: "POST",
        body: JSON.stringify({username: user.username, password: user.password}),
        headers: {
            'Content-Type': 'application/json',
            ...loginAuthHeader(user)
        }
    })).json()
}

export async function logout() {
    await storage.clearToken()
}

export async function register(user: User): Promise<any> {
    return await fetch(`${API_URI}/register`, {
        method: "POST",
        body: JSON.stringify({username: user.username, password: user.password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function getCurrentUser(): Promise<UserWithToken> {
    return (await fetch(`${API_URI}/me`, {
        method: "GET",
        headers: authHeader()
    })).json()
}

export function authHeader(): HeadersInit {
    const jwt = storage.getToken();

    if (jwt) {
        return {'Authorization': `Bearer ${jwt}`};
    } else {
        return {'Authorization': ''};
    }
}

export function loginAuthHeader(user: User): HeadersInit {
    return {'Authorization': `Basic ${window.btoa(user.username + ':' + user.password)}`};
}
