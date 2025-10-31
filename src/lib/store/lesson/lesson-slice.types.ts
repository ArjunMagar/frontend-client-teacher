import { Status } from "@/lib/global/types/global-type"


export interface Ilesson {
    lessonName: string,
    lessonDescription:string,
    lessonVideoUrl:string
    lessonThumbnailUrl:string
}
export interface ILesson extends Ilesson {
    id: string, 
    chapterId:string,   
    createdAt: string,
    updatedAt: string
}


export interface ILessonState {
    lessons: ILesson[],
    status: Status
}