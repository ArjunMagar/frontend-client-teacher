import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice"
import courseSlice from "./course/course-slice"
import chapterSlice from "./chapter/chapter-slice"

export const makeStore = () => {
    return configureStore({
      reducer: {
        auth: authSlice,
        course:courseSlice,
        chapter:chapterSlice

  
      },
    })
  }



  // Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']