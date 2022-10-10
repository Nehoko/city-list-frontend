import React, {useState} from "react";
import {useForm} from "../hooks/useForm";
import {City} from "../model/City";
import {useQuery} from "react-query";
import {getCity, updateCity} from "../api/city-list-api";
import {useLocation, useNavigate} from "react-router-dom";

export default function CityEditor() {
    const { values, onChange } = useForm({})
    const [updateError, setUpdateError] = useState<any>(null)
    const {id} = useLocation().state;
    const {data, status} = useQuery("getCity", () => getCity(id))
    const navigate = useNavigate();

    if (status === "loading") return (<p>Page is Loading...</p>)
    if (status === "error") return (<p>Error! Look at the logs</p>)
    return (
        <div>
            <p>City Editor</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const city: City = {name: values['name'], photo: values['photo'], id}
                    updateCity(city).then(_ => navigate("/")).catch(e => setUpdateError(e))
                }}
                >
                <input
                    autoComplete="new-name"
                    placeholder="name"
                    defaultValue={data?.name}
                    name="name"
                    onChange={onChange}
                />
                <img src={values['photo'] || data?.photo} sizes="200px, 300px" alt="corrupted"/>
                <input
                    autoComplete="new-photo"
                    placeholder="photo"
                    defaultValue={data?.photo}
                    name="photo"
                    onChange={onChange}
                />
                <button type="submit">Submit</button>
            </form>
            {updateError && (
                <div style={{ color: "tomato" }}>{JSON.stringify(updateError, null, 2)}</div>
            )}
            <button
                style={{ marginTop: '20px' }}
                onClick={() => navigate("/")}
            >
                Go To Main
            </button>
        </div>
    )
}