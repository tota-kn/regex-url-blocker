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

const isAdded = (url:string, blockUrls: string[]) => {
  for (const blockUrl of blockUrls) {
        const result = url.match(blockUrl)
        console.log(result)
        if (result !== null) {
          return true
        }
    }
  return false
}

const openOptionPage= () => {
    chrome.runtime.openOptionsPage()
}

</script>

<template>
  <div class="popup">
      <input class="input" v-model="state.url">
      <button 
        @click="addBlockUrl(state.url)"
        v-bind:disabled="isAdded(state.url, state.blockUrls)">
        add
      </button>

    <h2>Edit blocked urls</h2>
    <button @click="openOptionPage">Open option</button>
  </div>
</template>

<style scoped>
.popup {
  padding: 10px;
  min-width: 200px; 
}
.input {
  min-width: 300px; 
}
</style>