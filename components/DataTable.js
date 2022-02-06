import React, { useContext } from 'react'
import Link from 'next/link'
import { Table } from 'react-bootstrap'
import { DataContext } from '../context/dataContext'

const DataTable = () => {
  const { breweryList } = useContext(DataContext)

  return (
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
                <Link href='/brewery/[breweryId]' as={`/brewery/${brewery.id}`}>
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
  )
}

export default DataTable
