import {ChangeEvent, useState} from "react";

export function useForm(initialValues?: Record<string, any>) {
    const [values, setValues] = useState(initialValues || {});

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    };

    return {
        values,
        onChange
    };
}
