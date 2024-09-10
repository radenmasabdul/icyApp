import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './stores/admin/adminSlice'

export const store = configureStore({
    reducer: {
        admin: adminReducer,
    },
})
