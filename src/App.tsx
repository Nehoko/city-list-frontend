import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {CityTable} from "./components/CityTable"

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CityTable/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}

export default App;
