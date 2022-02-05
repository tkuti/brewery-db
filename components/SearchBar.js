import React, { useState, useEffect, useContext } from 'react'
import { ListGroup, Form, InputGroup, Spinner } from 'react-bootstrap'
import Link from 'next/link'
import { DataContext } from '../context/dataContext'
import { FaBeer } from 'react-icons/fa'

const SearchBar = () => {
  const {
    query,
    setQuery,
    isLoadingAutoComplete,
    autoCompleteList,
    fetchAutoComplete
  } = useContext(DataContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAutoComplete()
    }, 500)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div className='search-wrapper'>
      <InputGroup className='mb-3'>
        <Form.Control
          type='text'
          size='lg'
          placeholder='Search'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <InputGroup.Text id='basic-addon1'>
          <FaBeer />
        </InputGroup.Text>
      </InputGroup>
      <ListGroup>
        {isLoadingAutoComplete ? (
          <div className='spinner-container'>
            <Spinner animation='border' variant='warning' />
          </div>
        ) : (
          autoCompleteList &&
          autoCompleteList.slice(0, 5).map((brewery, i) => (
            <Link
              key={i}
              href='/brewery/[breweryId]'
              as={`/brewery/${brewery.id}`}
            >
              <ListGroup.Item action>{brewery.name}</ListGroup.Item>
            </Link>
          ))
        )}
      </ListGroup>
    </div>
  )
}

export default SearchBar
