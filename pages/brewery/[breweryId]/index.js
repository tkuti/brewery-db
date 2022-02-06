import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { DataContext } from '../../../context/dataContext'
import { Spinner, Table, Button, Container } from 'react-bootstrap'
import axios from 'axios'

const Brewery = ({ details }) => {
  const { breweryDetails, setBreweryDetails } = useContext(DataContext)
  const router = useRouter()

  useEffect(() => {
    setBreweryDetails(details)
  }, [])

  return (
    <div className='wrapper details-wrapper'>
      <Container>
        <Button
          variant='outline-warning'
          size='lg'
          onClick={() => router.back()}
        >
          &laquo; Back
        </Button>
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
      </Container>
    </div>
  )
}

export const getServerSideProps = async context => {
  const response = await axios.get(
    `https://api.openbrewerydb.org/breweries/${context.params.breweryId}`
  )
  const details = response.data
  return {
    props: {
      details
    }
  }
}

export default Brewery
