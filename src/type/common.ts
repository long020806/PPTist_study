export type PageInfo = {
    page:number,
    size:number,
    total:number
}

export enum PageDirection {
    UP,
    DOWN
}
export type PageResponseResult<T> = {
    status:string,
    message:string,
    data:{
        page:number,
        pages:number,
        total:number,
        records:Array<T>
    }
}
export type ResponseResult<T> = {
    status:string,
    message:string,
    data:Array<T>
}