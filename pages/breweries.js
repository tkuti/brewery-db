import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/dataContext'
import { Table, Spinner, Container } from 'react-bootstrap'
import Link from 'next/link'
import PaginationBar from '../components/PaginationBar'
import SearchBar from '../components/SearchBar'
import axios from 'axios'

const Breweries = ({ initialBreweries }) => {
  const { breweryList, setBreweryList, isLoading, page, fetchList } =
    useContext(DataContext)

  useEffect(() => {
    setBreweryList(initialBreweries)
    if (page !== 1) fetchList()
  }, [])

  return (
    <div className='wrapper breweries-wrapper'>
      <Container>
        <h2 className='subtitle'>Search for breweries</h2>
        <p className='description'>
          Start typing and choose one from the options for more details
        </p>
        <SearchBar />
        <h2 className='subtitle'>All breweries</h2>
        <p className='description'>
          You can use pagination to navigate between pages. Click to the
          brewery&apos;s name for more details.
        </p>
        {isLoading ? (
          <div className='spinner-container'>
            <Spinner animation='border' variant='warning' />
          </div>
        ) : (
          <>
            <Table striped bordered hover variant='dark' responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Type</th>
                  <th>Web</th>
                </tr>
              </thead>
              <tbody>
                {breweryList &&
                  breweryList.map((brewery, index) => (
                    <tr key={index}>
                      <td>
                        <Link
                          href='/brewery/[breweryId]'
                          as={`/brewery/${brewery.id}`}
                        >
                          {brewery.name}
                        </Link>
                      </td>
                      <td>{brewery.country}</td>
                      <td>{brewery.brewery_type}</td>
                      <td>{brewery.website_url}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <PaginationBar />
          </>
        )}
      </Container>
    </div>
  )
}

export const getServerSideProps = async context => {
  const response = await axios.get(
    `https://api.openbrewerydb.org/breweries?per_page=10&page=1`
  )
  const initialBreweries = response.data

  return {
    props: {
      initialBreweries
    }
  }
}

export default Breweries
