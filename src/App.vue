<script setup lang="ts">
import Editor from "./views/Editor/index.vue";
import {firstLoadingObj} from "./utils/useLoading";
const {isLoading} = firstLoadingObj;


</script>

<template>
  <div>
    <div v-show="isLoading">{{ '首屏加载中' }}</div>
    <Editor v-show="!isLoading"></Editor>
  </div>
</template>

<style scoped>

</style>
