import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { DataContext } from '../../../context/dataContext'
import Spinner from 'react-bootstrap/Spinner'

const Brewery = () => {
  const { breweryDetails, isLoading, fetchData } = useContext(DataContext)
  const router = useRouter()
  const { breweryId } = router.query

  useEffect(() => {
    fetchData(breweryId)
  }, [])

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      {isLoading ? (
        <Spinner animation='border' variant='primary' />
      ) : (
        <div>
          {breweryDetails &&
            Object.keys(breweryDetails).map((brewKey, i) => (
              <p key={i}>
                {brewKey}:<span>{breweryDetails[brewKey]}</span>
              </p>
            ))}
        </div>
      )}
    </div>
  )
}

export default Brewery
