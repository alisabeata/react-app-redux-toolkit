import React from 'react'
import type { RootState } from 'src/app/store'
// typed useSelector, useDispatch
import { useAppSelector, useAppDispatch } from 'src/app/hooks'
import { decrement, increment, incrementByAmount } from './counterSlice'

const CounterComponent = () => {
  // useSelector gets the value from the store
  const count = useAppSelector((state: RootState) => state.counter.value)
  // useDispatch is a new way how to process action creators
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Increment value by 10"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Increment by 10
        </button>
      </div>
    </div>
  )
}

export const Counter = React.memo(CounterComponent)