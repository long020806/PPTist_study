<template>
    <div class=" ">
      <main class="p-5">
        <template v-if="isLoading"> 加载中 </template>
        <template v-else>
          {{ resultRef }}
  
          {{ `当前第${pageInfo.page}页` }}
          <button @click="handleChange(PageDirection.UP)">上一页</button
          ><button @click="handleChange(PageDirection.DOWN)">下一页</button>
          <ul>
            <li v-for="item in userList" :key="item.id">
              <div>{{ item.id }}-{{ item.username }}-{{ item.created_at }}</div>
            </li>
          </ul>
        </template>
      </main>
    </div>
  </template>
  <script lang="ts" setup>
  import { hello, list } from "@/api/hello/index.js";
  import { PageInfo, PageDirection } from "@/type/common";
  import { User } from "@/type/hello";
  import { useLoading } from "@/utils/useLoading";
  import { reactive, ref } from "vue";
  import {firstLoadingObj} from "@/utils/useLoading";
  const { isLoading, loadingWrapper } = useLoading();
  let resultRef = ref<string>("");
  let userList = ref<Array<User>>([]);
  let pageInfo = reactive<PageInfo>({ page: 1, size: 10, total: 0 });
  const getHello = () => {
    console.log("getHello start");
    loadingWrapper(
      hello().then((res) => {
        resultRef.value = res;
        console.log("getHello end");
      })
    );
  };
  
  const getList = () => {
    const page: PageInfo = {
      page: pageInfo.page,
      size: pageInfo.size,
      total: pageInfo.total,
    };
    console.log("getList start");
    loadingWrapper(
      list(page).then((res) => {
        userList.value = res.data.records;
        pageInfo.page = res.data.page;
        pageInfo.total = res.data.total;
        console.log("getList end");
      })
    );
  };
  
  const handleChange = (direction: PageDirection) => {
    if (PageDirection.UP == direction) {
      pageInfo.page -= 1;
    } else if (PageDirection.DOWN == direction) {
      pageInfo.page += 1;
    }
    getList();
  };
  
  const get3sRequest = () => {
    console.log("get3sRequest start");
    loadingWrapper(
      new Promise<void>((r, _) => {
        setTimeout(() => {
          console.log("get3sRequest end");
          r();
        }, 3000);
      })
    );
  };
  
  
  getList();
  getHello();
  get3sRequest();
  const {loadingWrapper:firstLoadingWrapper} = firstLoadingObj;
  firstLoadingWrapper(new Promise<void>((r,_)=>{
    setTimeout(()=>{
      r();
    },1000)
  }))
  </script>
  <style scoped></style>
  