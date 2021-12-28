// Use background to communicate and to fire bacground actions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // If message is 'give me recipe' open new page with all recipes from storage
  if (request.message === "give me recipe") {
    chrome.tabs.create({ url: "content.html" });
    chrome.tabs.onUpdated.addListener(() => {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { msg: "get storage" });
      });
    });
  }
  if (request.message === "lucky wish") {
    //  If message 'lucky wish' choose random url from storage and open it
    chrome.storage.local.get({ recommendList: [], list: [] }, (result) => {
      var urList = result.recommendList.concat(result.list);
      var num = Math.floor(Math.random() * urList.length);
      chrome.tabs.create({ url: urList[num].url });
      //  insert script in active page
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "insert.js" });
      });
    });
  }
});
