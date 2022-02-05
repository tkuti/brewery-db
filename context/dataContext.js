import axios from 'axios'
import React, { createContext, useReducer, useState, useEffect } from 'react'

export const DataContext = createContext()

export const DataContextProvider = props => {
  const [page, setPage] = useState(1)
  const [breweryList, setBreweryList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [breweryDetails, setBreweryDetails] = useState(null)

  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = async id => {
    setIsLoading(true)
    setTimeout(async () => {
      let response
      id
        ? (response = await axios.get(
            `https://api.openbrewerydb.org/breweries/${id}`
          ))
        : (response = await axios.get(
            `https://api.openbrewerydb.org/breweries?per_page=10&page=${page}`
          ))
      id ? setBreweryDetails(response.data) : setBreweryList(response.data)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <DataContext.Provider value={{ page, setPage, breweryList, isLoading, breweryDetails, fetchData }}>
      {props.children}
    </DataContext.Provider>
  )
}
