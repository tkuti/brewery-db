import React, { useState, useEffect, useContext } from 'react'
import { ListGroup, Form } from 'react-bootstrap'
import Link from 'next/link'
import { DataContext } from '../context/dataContext'

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('')
  const { autoCompleteList, fetchAutoComplete } = useContext(DataContext)

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAutoComplete(inputValue)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [inputValue])

  return (
    <div>
      <Form.Control
        type='text'
        placeholder='Search'
        onChange={e => setInputValue(e.target.value)}
      />
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
