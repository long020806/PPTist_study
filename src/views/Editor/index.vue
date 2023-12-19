<template>
  <div class=" ">
    <main class="p-5">
      {{ resultRef }}
      <template v-if="isLoading">
        加载中
      </template>
      <template v-else>
        <button @click="handleChange(PageDirection.UP)">上一页</button><button @click="handleChange(PageDirection.DOWN)">下一页</button>
        <ul >
          <li v-for="item in userList" :key="item.id" >
            <div>{{ item.id }}-{{ item.username }}-{{ item.created_at }}</div>
          </li>
        </ul>
      </template>


    </main>
  </div>
</template>
<script lang="ts" setup>
import {hello, list} from "@/api/hello/index.js";
import { PageInfo, PageDirection } from "@/type/common";
import { User } from "@/type/hello";
import { useLoading } from "@/utils/useLoading";
import { reactive, ref } from "vue";
const {isLoading,loadingWrapper} = useLoading();
let resultRef = ref<string>("")
let userList = ref<Array<User>>([]);
let pageInfo = reactive<PageInfo>({page:1,size:10000,total:0});
const getHello  = ()=>{
  hello().then(res=>{
  console.log(res)
  resultRef.value = res;
});
}

const getList = ()=>{
  loadingWrapper(list(pageInfo).then(res=>{
    userList.value = res.data.records
    pageInfo.page = res.data.page;
    pageInfo.total = res.data.total;
  }));
}

const handleChange = (direction:PageDirection) => {
  if(PageDirection.UP == direction){
    pageInfo.page -= 1;
  }else if(PageDirection.DOWN == direction){
    pageInfo.page += 1;
  }
  getList();
}

getList();
getHello();


</script>
<style scoped>
</style>