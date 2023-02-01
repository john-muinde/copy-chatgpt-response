var getSiblings = function (e) {
  // for collecting siblings
  let siblings = [];
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild;
  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

function loadPage() {
  var arr = document.getElementsByClassName("markdown");

  for (let i = 0; i < arr.length; i++) {
    var btn = document.createElement("button");
    btn.classList.add("copy_code_button");
    var span = document.createElement("span");
    span.classList.add("textSpan");
    span.appendChild(document.createTextNode("Text Copy"));
    btn.appendChild(span);
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
  // console.log([...button].length,'::::::::::::',[...arr].length);
  [...button].forEach((elm) => {
    elm.addEventListener("click", (e) => {
      var textNode = e.target.parentNode.parentNode;
      var range = document.createRange();
      range.selectNode(textNode);
      window.getSelection().removeAllRanges(); // clear current selection
      window.getSelection().addRange(range); // to select text
      e.target.textContent = "Text Copied";
      document.execCommand("copy");
      window.getSelection().removeAllRanges(); // to deselect

      // trimmedText = text.replaceAll(/(Text\sCopy|Text\sCopied)/gm, "");
      // console.log(trimmedText);
    });
  });
}
window.onload = () => loadPage();
loadPage();

var currentURL = window.location.href;

setInterval(function () {
  if (window.location.href !== currentURL) {
    function checkForBodyChanges() {
      var body = document.body;
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === "childList") {
            // Execute the function if there's a change in the body tag
            loadPage();
            // Disconnect the observer to stop checking for changes
            observer.disconnect();
          }
        });
      });

      var config = {
        childList: true,
        subtree: true,
      };

      observer.observe(body, config);
    }
    checkForBodyChanges();

    currentURL = window.location.href;
  }
}, 500);
