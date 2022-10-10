import {User} from "./User";

export interface UserWithToken {
    jwt: string
    user: User
}