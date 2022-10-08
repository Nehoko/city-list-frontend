import React, {useState} from "react";
import {useQuery} from "react-query";
import {fetchCities} from "../api/city-list-api";
import {FetchCitiesParams} from "../api/FetchCitiesParams";
import {City} from "../model/City";

export function CityTable() {
    const [fetchCitiesParams, setFetchCitiesParams] = useState<FetchCitiesParams>({
        size: 10,
        search: undefined,
        page: 0
    });
    const {data, status} = useQuery(['cities', fetchCitiesParams], () => fetchCities(fetchCitiesParams))

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "error") {
        return <p>Error! Look at the logs</p>
    }

    return (
        <table>
            <tr>
                <th>
                    Name
                </th>
                <th>
                    Photo
                </th>
            </tr>
            {data?.content.map((city: City) =>
                (<tr key={city.id}>
                    <td>
                        {city.name}
                    </td>
                    <td>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img src={city.photo} sizes="200px, 300px" alt="photo image"/>
                    </td>
                </tr>)
            )}
        </table>
    )
}