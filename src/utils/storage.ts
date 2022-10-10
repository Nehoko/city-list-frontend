export const storage = {
    getToken: (): string | undefined => {
        const token = window.localStorage.getItem("token");
        if (token === undefined || token === null || token === 'undefined') {
            return undefined
        }
        return token
    },
    setToken: (token: string): void =>
        window.localStorage.setItem("token", token),
    clearToken: (): void => window.localStorage.removeItem("token")
};
