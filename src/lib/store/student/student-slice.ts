import { Status } from "@/lib/global/types/global-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudent, IStudentState } from "./student-slice.types";
import teacherApi from "@/lib/global/http/api";
import { AppDispatch } from "../store";

const initialState:IStudentState={
    students: [],
    status:Status.LOADING
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setStatus(state:IStudentState,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setStudent(state:IStudentState,action:PayloadAction<IStudent[]>){
            state.students = action.payload
        },
        resetStatus(state:IStudentState){
            state.status = Status.LOADING
        }
    }
})

export const {setStatus,setStudent,resetStatus} = studentSlice.actions
export default studentSlice.reducer

export function fetchStudents(token: string) {
    return async function fetchStudentsThunk(dispatch: AppDispatch) {
        try {
            const response = await teacherApi.get(`/student`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(response,"response")
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setStudent(response.data.data))
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

