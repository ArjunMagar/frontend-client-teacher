import { Status } from "@/lib/global/types/global-type"


export interface Ilesson {
    chapterName: string,
    chapterDuration:string,
    chapterLevel:string
}
export interface ILesson extends Ilesson {
    id: string, 
    courseId:string,   
    createdAt: string,
    updatedAt: string
}


export interface ILessonState {
    lessons: ILesson[],
    status: Status
}