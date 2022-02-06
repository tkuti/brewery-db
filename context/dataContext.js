import React, { createContext, useReducer, useState, useEffect } from 'react'
import useFetchData from '../hooks/useFetchData'

export const DataContext = createContext()

export const DataContextProvider = props => {
  const [page, dispatchPage] = useReducer((state, action) => {
    const lastPage = 802
    switch (action.type) {
      case 'incrementWithOne':
        return state === lastPage ? state : state + 1
      case 'decrementWithOne':
        return state === 1 ? state : state - 1
      case 'incrementWithTen':
        return state >= lastPage - 10 ? state : state + 10
      case 'decrementWithTen':
        return  state <= 10 ? state : state - 10
      case 'first':
        return 1
      case 'last':
        return lastPage
      case 'setWithOtherValue':
        return action.payload
      default:
        return state
    }
  }, 1)
  const [query, setQuery] = useState('')
  const [breweryDetails, setBreweryDetails] = useState(null)
  const {
    data: breweryList,
    setData: setBreweryList,
    fetchData: fetchDataList,
    isLoading
  } = useFetchData()
  const { data: autoCompleteList, fetchData: fetchDataAutoComplete } =
    useFetchData()

  useEffect(() => {
    fetchList()
  }, [page])

  const fetchList = async () => {
    fetchDataList(`?per_page=10&page=${page}`)
  }

  const fetchAutoComplete = async () => {
    fetchDataAutoComplete(`/autocomplete?query=${query}`)
  }

  return (
    <DataContext.Provider
      value={{
        page,
        dispatchPage,
        query,
        setQuery,
        breweryDetails,
        setBreweryDetails,
        breweryList,
        setBreweryList,
        isLoading,
        fetchList,
        autoCompleteList,
        fetchAutoComplete
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
