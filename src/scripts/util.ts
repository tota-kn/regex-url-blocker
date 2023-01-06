const getSyncStorage = async(key: string) => {
    const result = await chrome.storage.sync.get(key)

    if(!result){
        return null
    }
    
    return result[key]
}

const setSyncStorage = async(key: string, value: any) => {
    return await chrome.storage.sync.set({[key]:value})
}

const getCurrentTab = async () => {
    const tabs = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
        currentWindow: true
    });
    return tabs[0];
}

const openOption = () => {
    chrome.runtime.openOptionsPage()
}

const isContained = (text:string, patterns: string[]) => {
    for (const p of patterns) {
        const result = text.match(p)
        if (result !== null) {
            return true
        }
    }
    return false
}

export {
    getSyncStorage,
    setSyncStorage,
    getCurrentTab,
    openOption,
    isContained
}