import React, { useContext } from 'react'
import { DataContext } from '../context/dataContext'
import { Table, Spinner, Container } from 'react-bootstrap'
import Link from 'next/link'
import PaginationBar from '../components/PaginationBar'
import SearchBar from '../components/SearchBar'

const Breweries = () => {
  const { breweryList, isLoading } = useContext(DataContext)

  return (
    <div className='wrapper breweries-wrapper'>
      <Container>
        <h2>Breweries</h2>
        {isLoading ? (
          <Spinner animation='border' variant='warning' />
        ) : (
          <>
            <SearchBar />
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

export default Breweries
