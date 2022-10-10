import React, {useState} from "react";
import {useQuery} from "react-query";
import {fetchCities} from "../api/city-list-api";
import {FetchCitiesParams} from "../api/FetchCitiesParams";
import {City} from "../model/City";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../lib/auth";
import {ROLE_ALLOW_EDIT} from "../model/User";
import ReactPaginate from "react-paginate";
import {useForm} from "../hooks/useForm";

export default function CityTable() {
    const {user} = useAuth();
    const {values, onChange} = useForm();
    const [searchParams, setSearchParams] = useState<FetchCitiesParams>({
        size: 10,
        search: undefined,
        page: 0
    });
    const {data, status, isFetching} = useQuery(
        ['cities', searchParams],
        () => fetchCities(searchParams),
        {keepPreviousData: true, staleTime: 5000})
    const navigate = useNavigate();

    const handleSearch = (search: string) => {
        setSearchParams({...searchParams, search})
    }
    const handlePageChange = (selectedItem: { selected: number }) => {
        const page = selectedItem.selected
        setSearchParams({...searchParams, page})
    }

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "error") {
        return <p>Error! Look at the logs</p>
    }

    if (isFetching) {
        return <p>Updating data...</p>
    }

    return (
        <div>
            <form onSubmit={(event) => {
                event.preventDefault()
                handleSearch(values['search'])
            }}>

                <input type="text"
                       onChange={onChange}
                       defaultValue={searchParams.search}
                       placeholder="Type here to start search"
                       name="search"
                />
                <button type="submit">Search</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Photo</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {data?.content.map((city: City) =>
                    (<tr key={city.id}>
                        <td>{city.name}</td>
                        <td><img src={city.photo} sizes="200px, 300px" alt="City"/></td>
                        {
                            user?.roles.includes(ROLE_ALLOW_EDIT) &&
                            (
                                <td>
                                    <button onClick={(_) => navigate("/update-city", {state: {id: city.id}})}>
                                        Edit
                                    </button>
                                </td>
                            )
                        }
                    </tr>)
                )}
                </tbody>
            </table>

            <ReactPaginate pageCount={data?.totalPages || 1}
                           initialPage={searchParams.page}
                           previousAriaLabel="previous"
                           disabledClassName="pagination__link--disabled"
                           nextAriaLabel="next"
                           onPageChange={handlePageChange}
            />
        </div>
    )
}