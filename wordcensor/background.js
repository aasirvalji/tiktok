// 1) on click of this chrome extension icon, the content.js file will be ran in the current tab
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js'],
  });
});
