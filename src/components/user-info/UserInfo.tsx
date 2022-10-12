import React from "react";
import {useAuth} from "../../lib/auth";
import {useNavigate} from "react-router-dom";

export default function UserInfo() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    return user
        ? (
            <div>
                Welcome {user?.username}
                <button onClick={() => logout().then((_) => navigate("/")) }>Log Out</button>
            </div>
        )
        : (
            <div>
                Welcome Anonymous
                <button onClick={() => (navigate("/login"))}>Log In</button>
            </div>
        )

}