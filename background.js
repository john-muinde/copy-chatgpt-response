// listen for network requests

let count = 0;
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    // check if the request URL matches the API call
    if (
      details.url.startsWith(
        "https://chat.openai.com/backend-api/moderations"
      ) ||
      details.url.startsWith("https://chat.openai.com/backend-api/conversation")
    ) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, { file: "main.js" }, function () {
          if (chrome.runtime.lastError) {
            alert(chrome.runtime.lastError.message);
          }
        });
      });
    }
  },
  {
    urls: ["<all_urls>"],
  }
);

