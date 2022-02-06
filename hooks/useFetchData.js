import { useState } from 'react'
import axios from 'axios'

const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const instance = axios.create({
    baseURL: "https://api.openbrewerydb.org/breweries"
  })

  const fetchData = async url => {
    setIsLoading(true)
    const response = await instance.get(url)
    setData(response.data)
    setIsLoading(false)
  }

  return { isLoading, data, setData, fetchData }
}

export default useFetchData
