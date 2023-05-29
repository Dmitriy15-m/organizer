import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from './slices/calendarSlice'

const store = configureStore({
    reducer: {
       calendarSlice,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;