import { Status } from "@/lib/global/types/global-type"

export interface IStudent {
    enrollmentId: string, 
    username:string,
    email:string,
    courseName:string, 
    createdAt: string,
    updatedAt: string
}

export interface IStudentState {
    students: IStudent[],
    status: Status
}