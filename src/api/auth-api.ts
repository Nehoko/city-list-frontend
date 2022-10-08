import {API_URI} from "./city-list-api";

export function login(username: string, password: string) {
    return fetch(`${API_URI}/token`, {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(response.json()))
            }

            return response.json()
        });
}

export function logout() {
    localStorage.removeItem("user")
}

export function getCurrentUser() {
    let user = localStorage.getItem("user");
    return user && JSON.parse(user)
}

export function authHeader() {
    const user = getCurrentUser()

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}