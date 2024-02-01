import { configureStore } from '@reduxjs/toolkit'
import counterReducer from 'src/components/Counter/counterSlice'
import fetchDataReducer from 'src/components/Quote/fetchDataSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fetchData: fetchDataReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
