import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Status } from "@/lib/global/types/global-type";
import teacherApi from "@/lib/global/http/api";
import { ILesson, ILessonState } from "./lesson-slice.types";


const initialState: ILessonState = {
    lessons: [],
    status: Status.LOADING
}

const chapterSlice = createSlice({
    name: "chapter",
    initialState,
    reducers: {
        setStatus(state:ILessonState, action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setLesson(state:ILessonState, action:PayloadAction<ILesson[]>) {
            state.lessons = action.payload
        },
        resetStatus(state:ILessonState){
            state.status = Status.LOADING
        },
        addLesson(state:ILessonState,action:PayloadAction<ILesson>){
            state.lessons.push(action.payload)
        },
        // deleteCourses(state:ICourseState,action:PayloadAction<string>){
        //     const index = state.courses.findIndex((item)=>item.courseId === action.payload)
        //        if(index !== -1){
        //         state.courses.splice(index,1)
        //     }
        // }


    }
})


export const { setStatus,setLesson,resetStatus,addLesson} = chapterSlice.actions
export default chapterSlice.reducer


export function fetchLessons(token: string,chapterId:string) {
    return async function fetchLessonsThunk(dispatch: AppDispatch) {
        try {
            const response = await teacherApi.get(`/course/${chapterId}/lessons`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(response,"response")
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setLesson(response.data.data))
                dispatch(resetStatus())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
          
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

// export function createChapters(token: string,courseId:string,data:Ichapter) {
//     return async function createCoursesThunk(dispatch: AppDispatch) {
//         try {
//             const response = await teacherApi.post(`/course/${courseId}/chapters`,data, {
//                 headers: {
//                     Authorization: `${token}`,
//                 }
//             })
//             console.log(response,"chekc.........")
//             if(response.status === 201){
//                 dispatch(setStatus(Status.SUCCESS))
//                 dispatch(addChapter(response.data.data))

//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
          
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
//         }
//     }
// }

// export function deleteCourse(token:string,id:string) {
//     return async function deleteCourseThunk(dispatch: AppDispatch) {
//         try {
//             const response = await API.delete('/institute/course/'+id, {
//                 headers: {
//                     Authorization: `${token}`
//                 }
//             })
//             console.log(response)
//             if (response.status === 200) {
//                 dispatch(setStatus(Status.Success))
//                 dispatch(deleteCourses(id))
//             }else{
//                 dispatch(setStatus(Status.Error))
//             }

//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.Error))
//         }
//     }
// }

// export function fetchInstituteCourses(instituteId: string) {
//     return async function fetchCoursesThunk(dispatch: AppDispatch) {
//         try {
//             const response = await API.get(`/student/institute/${instituteId}/courses`)

//             // console.log(response,"Resultaaa")
//             if(response.status === 200){
//                 dispatch(setStatus(Status.Success))
//                 dispatch(setCourse(response.data.data))
//                 dispatch(resetStatus())
//             }else{
//                 dispatch(setStatus(Status.Error))
//             }
          
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.Error))
//         }
//     }
// }