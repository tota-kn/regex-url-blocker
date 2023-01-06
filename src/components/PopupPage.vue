<script setup lang="ts">
import { onMounted, reactive, toRaw } from "vue";
import { getCurrentTab, getSyncStorage, setSyncStorage, openOption, isContained } from "../scripts/util"

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
      <input class="input" v-model="state.url">
      <button 
        @click="addBlockUrl(state.url)"
        v-bind:disabled="isContained(state.url, state.blockUrls)">
        {{ isContained(state.url, state.blockUrls) ? "added" : "add"}}
      </button>

    <h2>Edit blocked urls</h2>
    <button @click="openOption()">Open option</button>
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