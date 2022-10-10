import {storage} from "../utils/storage";
import {User} from "../model/User";
import {initReactQueryAuth} from "react-query-auth";
import {getCurrentUser, login, logout, register} from "../api/auth-api";
import {AuthProviderConfig} from "react-query-auth/src";
import {UserWithToken} from "../model/UserWithToken";


export async function handleUserResponse(data: UserWithToken): Promise<User> {
    const { jwt, user } = data;
    storage.setToken(jwt);
    return user;
}

async function loadUser(): Promise<User | null> {
    let user = null;

    if (storage.getToken()) {
        user = await getCurrentUser();
    }
    return user?.user || null;
}

async function loginFn(data: User): Promise<User> {
    const response = await login(data);
    return await handleUserResponse(response);
}

async function registerFn(data: User): Promise<User> {
    const response = await register(data);
    return await handleUserResponse(response);
}

async function logoutFn() {
    await logout();
}

const authConfig: AuthProviderConfig<User | null> = {
    loadUser,
    loginFn,
    registerFn,
    logoutFn
};

const { AuthProvider, useAuth } = initReactQueryAuth<User | null>(authConfig);

export { AuthProvider, useAuth };