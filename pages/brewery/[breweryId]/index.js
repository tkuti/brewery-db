import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { DataContext } from '../../../context/dataContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'

const Brewery = () => {
  const { breweryDetails, isLoading, fetchDetails } = useContext(DataContext)
  const router = useRouter()
  const { breweryId } = router.query

  useEffect(() => {
    fetchDetails(breweryId)
  }, [])

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      {isLoading ? (
        <Spinner animation='border' variant='primary' />
      ) : (
        <div>
            <Table striped bordered variant="dark">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {breweryDetails &&
                Object.keys(breweryDetails).map((brewKey, index) => (
                  <tr key={index}>
                    <td>{brewKey}</td>
                    <td>{breweryDetails[brewKey]}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default Brewery
