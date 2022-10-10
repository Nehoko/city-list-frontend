import React, {useState} from "react";
import {useQuery} from "react-query";
import {fetchCities} from "../api/city-list-api";
import {FetchCitiesParams} from "../api/FetchCitiesParams";
import {City} from "../model/City";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../lib/auth";
import {ROLE_ALLOW_EDIT} from "../model/User";

export default function CityTable() {
    const {user} = useAuth();
    const [fetchCitiesParams, setFetchCitiesParams] = useState<FetchCitiesParams>({
        size: 10,
        search: undefined,
        page: 0
    });
    const {data, status} = useQuery('cities', () => fetchCities(fetchCitiesParams))
    const navigate = useNavigate();

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "error") {
        return <p>Error! Look at the logs</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Photo
                </th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {data?.content.map((city: City) =>
                (<tr key={city.id}>
                    <td>
                        {city.name}
                    </td>
                    <td>
                        <img src={city.photo} sizes="200px, 300px" alt="City"/>
                    </td>
                    {
                        user?.roles.includes(ROLE_ALLOW_EDIT) &&
                        (
                            <td>
                                <button onClick={(_) => navigate("/update-city", {state: {id: city.id}})}>Edit</button>
                            </td>
                        )
                    }
                </tr>)
            )}
            </tbody>
        </table>
    )
}