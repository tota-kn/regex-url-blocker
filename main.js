const blockRegexUrls = [
    "https://www.youtube.com/$"
]

async function getCurrentTab() {
    let queryOptions = {
        active: true,
        lastFocusedWindow: true,
        currentWindow: true
    };
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0];
}

function block(tab) {
    for (const u of blockRegexUrls) {
        const result = tab.url.match(u)
        if (result !== null) {
            chrome.tabs.update(tab.id, { url: "https://www.google.co.jp/"})
            break;
        }
    }
}

chrome.tabs.onUpdated.addListener(function () {
    getCurrentTab().then(tab => {
        block(tab);
    })
})