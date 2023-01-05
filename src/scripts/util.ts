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

export {
    getSyncStorage,
    setSyncStorage,
    getCurrentTab
}