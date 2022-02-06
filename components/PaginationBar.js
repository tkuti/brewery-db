import React, { useState, useEffect, useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { DataContext } from '../context/dataContext'

const PaginationBar = () => {
  const { page, dispatchPage } = useContext(DataContext)
  const [items, setItems] = useState([])

  useEffect(() => {
    createBar()
  }, [page])

  const createBar = () => {
    const pagination = []
    pagination.push(
      <Pagination.First
        key='first'
        onClick={() => dispatchPage({ type: 'first' })}
      />
    )
    pagination.push(
      <Pagination.Prev
        key='prev'
        onClick={() => dispatchPage({ type: 'decrementWithOne' })}
      />
    )
    pagination.push(
      <Pagination.Ellipsis
        key='minus10'
        onClick={() => dispatchPage({ type: 'decrementWithTen' })}
      />
    )
    const floor = Math.floor(page / 5) * 5 || 1
    for (let number = floor; number <= floor + 4 && number <= 802; number++) {
      pagination.push(
        <Pagination.Item
          key={number}
          size="sm"
          active={number === page}
          value={number}
          onClick={() =>
            dispatchPage({ type: 'setWithOtherValue', payload: number })
          }
        >
          {number}
        </Pagination.Item>
      )
    }
    pagination.push(
      <Pagination.Ellipsis
        key='plus10'
        onClick={() => dispatchPage({ type: 'incrementWithTen' })}
      />
    )
    pagination.push(
      <Pagination.Next
        key='next'
        onClick={() => dispatchPage({ type: 'incrementWithOne' })}
      />
    )
    pagination.push(
      <Pagination.Last
        key='last'
        onClick={() => dispatchPage({ type: 'last' })}
      />
    )
    setItems(pagination)
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  )

  return <div>{paginationBasic}</div>
}

export default PaginationBar
