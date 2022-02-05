import React, { useState, useEffect, useContext } from 'react'
import { Pagination } from 'react-bootstrap'
import { DataContext } from '../context/dataContext'

const PaginationBar = () => {
  const { page, setPage } = useContext(DataContext)
  const [items, setItems] = useState([])

  useEffect(() => {
    createBar()
  }, [page])

  const createBar = () => {
    const pagination = []
    pagination.push(<Pagination.First onClick={() => setPage(1)} />)
    pagination.push(
      <Pagination.Prev onClick={() => page !== 1 && setPage(page - 1)} />
    )
    pagination.push(
      <Pagination.Ellipsis  onClick={() => page > 11 && setPage(page - 10)} />
    )
    const floor = Math.floor(page / 10) * 10 || 1
    for (let number = floor; number <= floor + 9; number++) {
      pagination.push(
        <Pagination.Item
          key={number}
          active={number === page}
          value={number}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      )
    }
    pagination.push(
      <Pagination.Ellipsis onClick={() => page < 792 && setPage(page + 10)} />
    )
    pagination.push(
      <Pagination.Next onClick={() => page !== 802 && setPage(page + 1)} />
    )
    pagination.push(<Pagination.Last onClick={() => setPage(802)} />)
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
