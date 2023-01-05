<script setup lang="ts">
import { onMounted, reactive, toRaw } from "vue";
import { getCurrentTab, getSyncStorage, setSyncStorage } from "../scripts/util"

const state = reactive({ 
  url: "",
  blockUrls: [""]
})

onMounted(async () => {
  state.url = await getCurrentUrl()
  loadBlockUrls() 
})

const getCurrentUrl = async () => {
  const tab = await getCurrentTab()
  return tab.url ?? ""
}

const loadBlockUrls = async () => {
  state.blockUrls = await getSyncStorage("blockUrls")
}

const addBlockUrl = async (url:string) => {
  state.blockUrls.push(url)
  await setSyncStorage("blockUrls", toRaw(state.blockUrls))
  loadBlockUrls()
}
</script>

<template>
  <div class="popup">
    <h2>current url</h2>
      <input v-model="state.url">
      <button @click="addBlockUrl(state.url)">add</button>

    <h2>blocked urls</h2>
    <div v-for="url in state.blockUrls" :key="url">{{ url }}</div>
  </div>
</template>

<style scoped>
.popup {
  padding: 10px;
  min-width: 200px; 
}
</style>