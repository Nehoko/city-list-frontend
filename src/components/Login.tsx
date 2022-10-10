import React from "react";
import {useAuth} from "../lib/auth";
import {useForm} from "../hooks/useForm";
import {useNavigate} from "react-router-dom";

export function Login() {
    const { login } = useAuth();
    const { values, onChange } = useForm({});
    const [error, setError] = React.useState<any>(null);
    const navigate = useNavigate();
    return (
        <div>
            Login
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    login(values)
                        .then((_) => navigate("/"))
                        .catch(err => setError(err));
                }}
            >
                <input
                    autoComplete="new-password"
                    placeholder="username"
                    name="username"
                    onChange={onChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={onChange}
                />
                <button type="submit">Submit</button>
            </form>
            {error && (
                <div style={{ color: "tomato" }}>{JSON.stringify(error, null, 2)}</div>
            )}
            <button
                style={{ marginTop: '20px' }}
                onClick={() => navigate("/")}
            >
                Go To Main
            </button>
        </div>
    );
}
