import {City} from "../model/City";
import {Page} from "../model/Page";
import {FetchCitiesParams} from "./FetchCitiesParams";

const apiUri = "http://localhost:8080/api"

export async function fetchCities(params: FetchCitiesParams): Promise<Page<City>> {
    let requestUri = `${apiUri}/city_page?page=${params.page}&size=${params.size}`
    if (params.search) {
        let searchEncoded = encodeURIComponent(params.search);
        requestUri = requestUri + `&search=${searchEncoded}`
    }
    const res = await fetch(requestUri, {method: "GET"})

    return res.json()
}