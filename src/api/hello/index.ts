import fetchService from '@/utils/FetchService';
/**
 * helloworld 案例
 */
const hello_url = "/";
/**
 * 查询用户列表
 */
const hello_list_url = "/mysql/data/json";
/**
 * 查询用户详情
 */
const hello_detail_url = "/mysql/data/detail";
type PageInfo = {
    page:number,
    size:number
}
type PageResponseResult<T> = {
    status:string,
    message:string,
    data:{
        page:number,
        pages:number,
        total:number,
        records:Array<T>
    }
}
type ResponseResult<T> = {
    status:string,
    message:string,
    data:Array<T>
}

export type User = {
    id:string,
    username:string,
    created_at:string
}

export const hello = ()=>{
    const result = fetchService.get<string>(hello_url);
    return result;
}

export const list = (pageInfo:PageInfo)=>{
    const result = fetchService.post<PageResponseResult<User>,PageInfo>(hello_list_url,pageInfo);
    return result;
}

export const detail = (id:string)=>{
    const result = fetchService.get<ResponseResult<User>>(`${hello_detail_url}?id=${id}`);
    return result;
}