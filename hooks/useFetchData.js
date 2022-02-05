import { useState } from 'react'
import axios from 'axios'

const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const baseUrl = 'https://api.openbrewerydb.org/breweries'

  const fetchData = async url => {
    setIsLoading(true)
    const response = await axios.get(baseUrl + url)
    setData(response.data)
    setIsLoading(false)
  }

  return { isLoading, data, fetchData }
}

export default useFetchData
