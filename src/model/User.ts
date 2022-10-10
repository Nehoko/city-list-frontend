export interface User {
    username: string,
    password: string,
    roles: Array<string>
}

export const ROLE_ALLOW_EDIT = "ROLE_ALLOW_EDIT"