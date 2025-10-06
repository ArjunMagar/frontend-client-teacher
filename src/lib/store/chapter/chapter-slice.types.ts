import { Status } from "@/lib/global/types/global-type"


export interface Ichapter {
    chapterName: string,
    chapterDuration:string,
    chapterLevel:string
}
export interface IChapter extends Ichapter {
    id: string, 
    courseId:string,   
    createdAt: string,
    updatedAt: string
}


export interface IChapterState {
    chapters: IChapter[],
    status: Status
}