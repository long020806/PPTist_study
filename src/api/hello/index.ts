import { PageInfo, PageResponseResult, ResponseResult } from '@/type/common';
import { User } from '@/type/hello';
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