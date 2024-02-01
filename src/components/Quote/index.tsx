import React, { useEffect, useRef } from 'react'
import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import { fetchData } from './fetchDataSlice'
import type { QuoteType } from 'src/types/quote.type'

export const Quote = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.fetchData.data)
  const status = useAppSelector((state) => state.fetchData.status)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (status === 'idle') {
      // avoid loading the quote twice
      timeoutRef.current = setTimeout(() => {
        dispatch(fetchData())
      })
    }

    return () => {
      // Clear the timeout when the component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [status, dispatch])

  return (
    <div>
      {data &&
        data.map((item: QuoteType, id: number) => (
          <blockquote key={id}>
            <p>{item.quote}</p>
            <footer>{item.author} (category: {item.category})</footer>
          </blockquote>
        ))}
    </div>
  )
}
