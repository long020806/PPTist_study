<template>
  <div class=" ">
    <main class="p-5">
      {{ resultRef }}
      <ul>
        <li v-for="item in userList" :key="item.id">
          <div>{{ item.id }}-{{ item.username }}-{{ item.created_at }}</div>
        </li>
      </ul>

    </main>
  </div>
</template>
<script lang="ts" setup>
import {hello, list, User} from "@/api/hello/index.js";
import { ref } from "vue";
let resultRef = ref<string>("")
let userList = ref<Array<User>>([]);
hello().then(res=>{
  console.log(res)
  resultRef.value = res;
});
list({page:10,size:100}).then(res=>{
  console.log(res,"userList");
  userList.value = res.data.records;
})
</script>
<style scoped>
</style>