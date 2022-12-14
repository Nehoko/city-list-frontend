import {City} from "../model/City";
import {Page} from "../model/Page";
import {FetchCitiesParams} from "./FetchCitiesParams";
import {authHeader} from "./auth-api";

export const API_URI = "http://localhost:8080/api"

export async function fetchCities(params: FetchCitiesParams): Promise<Page<City>> {
    let requestUri = `${API_URI}/city_page?page=${params.page}&size=${params.size}`
    if (params.search) {
        let searchEncoded = encodeURIComponent(params.search);
        requestUri = requestUri + `&search=${searchEncoded}`
    }
    const res = await fetch(requestUri, {method: "GET"})

    return res.json()
}

export async function updateCity(city: City): Promise<boolean> {
    let requestUri = `${API_URI}/city`

    const res = await fetch(requestUri, {
        method: "PUT",
        body: JSON.stringify(city),
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        }
    })

    return res.ok
}

export async function getCity(id: number): Promise<City> {
    let requestUri = `${API_URI}/city?id=${id}`

    const res = await fetch(requestUri, {
        method: "GET",
        headers: authHeader()
    })

    return res.json()
}