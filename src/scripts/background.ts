import { getSyncStorage, getCurrentTab } from "./util"

const block = async (tab: chrome.tabs.Tab, urls: string[]) => { 
    for (const url of urls) {
        const result = tab.url?.match(url)
        if (result !== null) {
            updateTab(tab, await getSyncStorage("redirectUrl"))
            break;
        }
    }
}



const updateTab = (tab: chrome.tabs.Tab, url: string) => {
    if(!tab.id){
        return
    }
    chrome.tabs.update(tab.id, { url })
}

chrome.tabs.onUpdated.addListener(async () => {
    const currentTab = await getCurrentTab()
    const blockUrls = await getSyncStorage("blockUrls")
    block(currentTab, blockUrls);
})






