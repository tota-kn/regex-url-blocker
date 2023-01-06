<script setup lang="ts">
import { onMounted, reactive, toRaw} from "vue";
import { getSyncStorage, setSyncStorage } from "../scripts/util"

const state = reactive({
  redirectUrl: "",
  blockUrls: [""],
  newBlockUrl: "",
  beforeRedirectUrl: "",
  beforeBlockUrls: []
})

onMounted(async () => {
  loadRedirectUrl()
  loadBlockUrls()
})

const loadRedirectUrl = async () => {
  let redirectUrl = await getSyncStorage("redirectUrl")
  if(!redirectUrl){
    const defaultValue = "https://www.google.co.jp/"
    setRedirectUrl(defaultValue)
    redirectUrl = defaultValue
  }

  state.beforeRedirectUrl = redirectUrl
  state.redirectUrl = redirectUrl
}

const setRedirectUrl = async (redirectUrl: string) => {
  await setSyncStorage("redirectUrl", redirectUrl)

  state.beforeRedirectUrl = redirectUrl
  state.redirectUrl = redirectUrl
}

const isRedirectUrlSaved = () => {
  return state.beforeRedirectUrl === state.redirectUrl
}

const loadBlockUrls = async () => {
  const blockUrls = await getSyncStorage("blockUrls")
  if(!blockUrls){
    const defaultValue: string[] = []
    setBlockUrls(defaultValue)
  }

  state.beforeBlockUrls = blockUrls
  state.blockUrls = blockUrls
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
    <button v-bind:disabled="isRedirectUrlSaved()" @click="setRedirectUrl(state.redirectUrl)">save</button>
    <button v-bind:disabled="isRedirectUrlSaved()" @click="loadRedirectUrl()">reload</button>

    <h2>block url list</h2>
    <div v-for="(item, index) in state.blockUrls" :key="index">
      <input v-model="state.blockUrls[index]">
      <button @click="deleteBlockUrl(index)">delete</button>
    </div>
    <input v-model="state.newBlockUrl">
    <button @click="addBlockUrl(state.newBlockUrl)">add</button>
    <div>
      <button @click="setBlockUrls(state.blockUrls)">save</button>
      <button @click="loadBlockUrls()">reload</button>
    </div>
  </div>
</template>

<style scoped>
input {
  width: 400px;
}

</style>