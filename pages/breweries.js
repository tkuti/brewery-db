import React, { useContext, useEffect } from 'react'
import { DataContext } from '../context/dataContext'
import { Spinner, Container } from 'react-bootstrap'
import SearchBar from '../components/SearchBar'
import DataTable from '../components/DataTable'
import PaginationBar from '../components/PaginationBar'
import axios from 'axios'

const Breweries = ({ initialBreweries }) => {
  const { setBreweryList, isLoading, page, fetchList } =
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
            <DataTable />
            <PaginationBar />
          </>
        )}
      </Container>
    </div>
  )
}


export const getServerSideProps = async context => {
  let initialBreweries
  try {
    const response = await axios.get(
      `https://api.openbrewerydb.org/breweries?per_page=10&page=1`
    )
    initialBreweries = response.data
  } catch (error) {
    console.log(error)
    initialBreweries = []
  }

  return {
    props: {
      initialBreweries
    }
  }
}

export default Breweries
