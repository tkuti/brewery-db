import axios from 'axios'
import React, { createContext, useReducer, useState, useEffect } from 'react'

export const DataContext = createContext()

export const DataContextProvider = props => {
  const [page, setPage] = useState(1)
  const [breweryList, setBreweryList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [breweryDetails, setBreweryDetails] = useState(null)
  const [autoCompleteList, setAutoCompleteList] = useState(null)

  useEffect(() => {
    fetchList()
  }, [page])

  const fetchList = async () => {
    setIsLoading(true)
    const response = await axios.get(
      `https://api.openbrewerydb.org/breweries?per_page=10&page=${page}`
    )
    setBreweryList(response.data)
    setIsLoading(false)
  }

  const fetchDetails = async id => {
    //setIsLoading(true)
    const response = await axios.get(
      `https://api.openbrewerydb.org/breweries/${id}`
    )
    setBreweryDetails(response.data)
    // setIsLoading(false)
  }

  const fetchAutoComplete = async query => {
    //setIsLoading(true)
    const response = await axios.get(
      `https://api.openbrewerydb.org/breweries/autocomplete?query=${query}`
    )
    setAutoCompleteList(response.data)
    //setIsLoading(false)
  }

  return (
    <DataContext.Provider
      value={{
        page,
        setPage,
        breweryList,
        isLoading,
        breweryDetails,
        fetchList,
        fetchDetails,
        autoCompleteList,
        fetchAutoComplete
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
