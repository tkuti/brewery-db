import axios from 'axios'
import React, { createContext, useReducer,useState, useEffect } from 'react'

export const DataContext = createContext()


export const DataContextProvider = (props) => {
    const [page,setPage] = useState(1)
    const [breweryList, setBreweryList] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchData()
    }, [page])

    const fetchData = async () => {
        setIsLoading(true)
        setTimeout(async () => {
            const response = await axios.get('https://api.openbrewerydb.org/breweries?page=1&per_page=10')
            setBreweryList(response.data)
            setIsLoading(false)
        }, 2000)
    }



    return (
        <DataContext.Provider value={{ page, setPage, breweryList, isLoading }}>
            {props.children}
        </DataContext.Provider>
    )
}