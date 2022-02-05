import React, { useContext } from 'react'
import { DataContext } from '../context/dataContext'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Link from 'next/link'
import PaginationBar from '../components/PaginationBar'
import 'bootstrap/dist/css/bootstrap.min.css'

const Breweries = () => {
  const { breweryList, isLoading } = useContext(DataContext)

  return (
    <div>
      <h1>Breweries</h1>
      {isLoading ? (
        <Spinner animation='border' variant='primary' />
      ) : (
        <>
          <Table striped bordered hover>
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
    </div>
  )
}

export default Breweries
