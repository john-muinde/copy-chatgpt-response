function reloadPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { file: "main.js" }, function () {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
    });
  });
}
// listen for network requests
chrome.webRequest.onCompleted.addListener(
  function (details) {
    // check if the request URL matches the API call
    if (
      details.url.startsWith(
        "https://chat.openai.com/backend-api/moderations"
      ) ||
      details.statusCode != 200
    ) {
      reloadPage();
    }
  },
  {
    urls: ["<all_urls>"],
  }
);

