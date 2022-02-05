import React, { createContext, useReducer, useState, useEffect } from 'react'
import useFetchData from '../hooks/useFetchData'

export const DataContext = createContext()

export const DataContextProvider = props => {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const {
    data: breweryList,
    isLoading: isLoadingList,
    fetchData: fetchDataList
  } = useFetchData()
  const {
    data: breweryDetails,
    isLoading: isLoadingDetails,
    fetchData: fetchDataDetails
  } = useFetchData()
  const {
    data: autoCompleteList,
    isLoading: isLoadingAutoComplete,
    fetchData: fetchDataAutoComplete
  } = useFetchData()

  useEffect(() => {
    fetchList()
  }, [page])

  const fetchList = async () => {
    fetchDataList(`?per_page=10&page=${page}`)
  }

  const fetchDetails = async id => {
    fetchDataDetails(`/${id}`)
  }

  const fetchAutoComplete = async () => {
    fetchDataAutoComplete(`/autocomplete?query=${query}`)
  }

  return (
    <DataContext.Provider
      value={{
        page,
        setPage,
        query,
        setQuery,
        breweryList,
        isLoadingList,
        isLoadingDetails,
        isLoadingAutoComplete,
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
