import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { DataContext } from '../../../context/dataContext'
import { Spinner, Table, Button, Container } from 'react-bootstrap'

const Brewery = () => {
  const { breweryDetails, isLoading, fetchDetails } = useContext(DataContext)
  const router = useRouter()
  const { breweryId } = router.query

  useEffect(() => {
    fetchDetails(breweryId)
  }, [])

  return (
    <div className='wrapper'>
      <Container>
        <Button
          variant='outline-warning'
          size='lg'
          onClick={() => router.back()}
        >
          Back
        </Button>
        {isLoading ? (
          <Spinner animation='border' variant='primary' />
        ) : (
          <div>
            <h2>{breweryDetails?.name}</h2>
            <Table striped bordered variant='dark'>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Data</th>
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
      </Container>
    </div>
  )
}

export default Brewery
