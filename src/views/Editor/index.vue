<template>
  <div class=" ">
    <main class="p-5">
      {{ resultRef }}
      <template v-if="isLoading">
        加载中
      </template>
      <template v-else>
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
import {hello, list, User} from "@/api/hello/index.js";
import { useLoading } from "@/utils/useLoading";
import { ref } from "vue";
const {isLoading,loadingWrapper} = useLoading();
let resultRef = ref<string>("")
let userList = ref<Array<User>>([]);
hello().then(res=>{
  console.log(res)
  resultRef.value = res;
});

loadingWrapper(list({page:90000,size:100}).then(res=>{
  userList.value = res.data.records
}));

</script>
<style scoped>
</style>