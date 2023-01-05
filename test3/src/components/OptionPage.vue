<script setup lang="ts">
import { onMounted, reactive, toRaw} from "vue";
import { getSyncStorage, setSyncStorage } from "../scripts/util"

const state = reactive({
  redirectUrl: "",
  blockUrls: [""],
  newBlockUrl: ""
})

    // ".*.youtube.com/*$",
    // ".*.twitter.com/home/*$",
    // ".*.anond.hatelabo.jp/.*",
    // ".*.togetter.com/*$",

onMounted(async () => {
  loadRedirectUrl()
  loadBlockUrls()
})

const loadRedirectUrl = async () => {
  state.redirectUrl = await getSyncStorage("redirectUrl") ?? ""
}

const setRedirectUrl = async (redirectUrl: string) => {
  await setSyncStorage("redirectUrl", redirectUrl)
}

const loadBlockUrls = async () => {
  state.blockUrls = await getSyncStorage("blockUrls") ?? []
}

const setBlockUrls = async (blockUrls: string[]) => {
  await setSyncStorage("blockUrls", toRaw(blockUrls))
}

const addBlockUrl = (url:string) => {
  state.blockUrls.push(url)
  state.newBlockUrl = ""
}

const deleteBlockUrl = (index: number) => {
  state.blockUrls.splice(index,1)
}
</script>

<template>
  <div>
    <h2>redirect url</h2>
    <input v-model="state.redirectUrl">
    <button @click="setRedirectUrl(state.redirectUrl)">save</button>
    <button @click="loadRedirectUrl()">reload</button>

    <h2>block url list</h2>
    <div v-for="(item, index) in state.blockUrls" :key="index">
      <input v-model="state.blockUrls[index]">
      <button @click="deleteBlockUrl(index)">delete</button>
    </div>
    <div>
      <button @click="setBlockUrls(state.blockUrls)">save</button>
      <button @click="loadBlockUrls()">reload</button>
    </div>
    <div>
      <input v-model="state.newBlockUrl">
      <button @click="addBlockUrl(state.newBlockUrl)">add</button>
    </div>
  </div>
</template>

<style scoped>
input {
  width: 400px;
}

</style>