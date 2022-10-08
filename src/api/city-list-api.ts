const apiUri = "http://localhost:8080/api"

export async function fetchCities(page: number, size: number, search?: string) {
    let requestUri = `${apiUri}/city_page?page=${page}&size=${size}`
    if (search) {
        let searchEncoded = encodeURIComponent(search);
        requestUri = requestUri + `&search=${searchEncoded}`
    }
    const res = await fetch(requestUri, {method: "GET"})

    return res.json()
}