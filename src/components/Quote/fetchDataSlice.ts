import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { QuoteType } from 'src/types/quote.type'

export interface DataState {
  data: QuoteType[] | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
}

const initialState: DataState = {
  data: null,
  status: 'idle',
  error: '',
}

// Create an async thunk to fetch data
// 'fetchData' is action type here
export const fetchData = createAsyncThunk('fetchData', async () => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
      method: 'GET',
      headers: {
        'X-Api-Key': `${process.env.REACT_APP_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  } catch (error) {
    throw error
  }
})

const fetchDataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Other synchronous actions can be defined here
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state while fetching user data
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading'
      })
      // Handle successful user data retrieval
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      // Handle the error state if fetching user data fails
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message as string
      })
  },
})

export default fetchDataSlice.reducer
