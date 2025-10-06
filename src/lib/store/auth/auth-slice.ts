import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthData, IAuthInitialData, IAuthLoginData } from "./auth-type";
import { Status } from "@/lib/global/types/global-type";
import teacherApi from "@/lib/global/http/api";
import { AppDispatch } from "../store";

const initialState:IAuthInitialData = {
    status:Status.LOADING,
    authData: null
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers:{
        setStatus(state:IAuthInitialData,action:PayloadAction<Status>){
            state.status = action.payload
        },
        setAuthData(state:IAuthInitialData,action:PayloadAction<IAuthData>){
            state.authData = action.payload
        }
    }
})

export const{setStatus,setAuthData}=authSlice.actions
export default authSlice.reducer

// API INTEGRATION

export function teacherLogin(data:IAuthLoginData){
    return async function teacherLoginThunk(dispatch:AppDispatch){
        try {
            const response = await teacherApi.post('/login',data)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                response.data.data && dispatch(setAuthData(response.data.data))
                localStorage.setItem("token", response.data.data.teacherToken);
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}