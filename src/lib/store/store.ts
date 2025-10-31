import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice"
import courseSlice from "./course/course-slice"
import chapterSlice from "./chapter/chapter-slice"
import lessonSlice from "./lesson/lesson-slice"
import studentSlice from "./student/student-slice"

export const makeStore = () => {
    return configureStore({
      reducer: {
        auth: authSlice,
        course:courseSlice,
        chapter:chapterSlice,
        lesson:lessonSlice,
        student:studentSlice

  
      },
    })
  }



  // Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']