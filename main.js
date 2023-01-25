function loadPage() {
  var arr = document.getElementsByClassName("markdown");

  for (let i = 0; i < arr.length; i++) {
    var btn = document.createElement("button");
    btn.classList.add("copy_code_button");
    btn.appendChild(document.createTextNode("Copy Response"));
    arr[i].appendChild(btn);
    //styling the button
    btn.style.position = "absolute";
    btn.style.top = "-20px";
    btn.style.right = "-10px";
    btn.style.backgroundColor = "#0293d2";
    btn.style.borderRadius = "4px";
    btn.style.padding = "3px";
    btn.style.fontSize = "14px";

    console.log("Appended");
  }

  var button = document.querySelectorAll(".copy_code_button");
  [...button].forEach((elm, index) => {
    elm.addEventListener("click", (e) => {
      text = arr[index].innerText;
      // Split the text by newline characters
      let lines = text.split("\n");

      // Remove the last line
      lines.pop();

      // Join the remaining lines back together
      let trimmedText = lines.join("\n");
      navigator.clipboard.writeText(trimmedText);
      elm.textContent = "Copied ";
    });
  });
}

let body = document.querySelector("body");

// body.addEventListener("DOMNodeInsertedIntoDocument", loadPage);
// body.addEventListener("DOMNodeInserted", loadPage);

// Listen for changes to the browser's history

// chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
//   chrome.tabs.executeScript(details.tabId, { file: "main.js" });
// }, {});
loadPage();
