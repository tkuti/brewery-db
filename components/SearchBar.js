import React, { useState, useEffect, useContext } from 'react'
import { ListGroup, Form, InputGroup } from 'react-bootstrap'
import Link from 'next/link'
import { DataContext } from '../context/dataContext'
import { FaBeer } from 'react-icons/fa';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('')
  const { autoCompleteList, fetchAutoComplete } = useContext(DataContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAutoComplete(inputValue)
    }, 500)

    return () => clearTimeout(timeout)
  }, [inputValue])

  return (
    <div className='search-wrapper'>
      <InputGroup className='mb-3'>
        <Form.Control
          type='text'
          size='lg'
          placeholder='Search'
          onChange={e => setInputValue(e.target.value)}
        />
        <InputGroup.Text id='basic-addon1'>
        <FaBeer />
        </InputGroup.Text>
      </InputGroup>
      <ListGroup>
        {autoCompleteList &&
          autoCompleteList.slice(0, 5).map((brewery, i) => (
            <ListGroup.Item key={i} action>
              <Link href='/brewery/[breweryId]' as={`/brewery/${brewery.id}`}>
                {brewery.name}
              </Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}

export default SearchBar
