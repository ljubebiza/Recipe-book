//Waiting to load html DOM
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Selcet buttons and listern for click to fier functions
    document.querySelector("#addUrl").addEventListener("click", getUrl, false);
    document
      .querySelector("#showUrl")
      .addEventListener("click", getRecipes, false);
    document
      .querySelector("#recommend")
      .addEventListener("click", goToUrl, false);
    hide();
  },
  false
);

//Function that takes url adress and title of page on which the user is currently
function getUrl() {
  chrome.storage.local.get({ list: [] }, (result) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var currentTab = { url: tabs[0].url, titles: tabs[0].title };
      let checkRepetiton = urlRepeat(result.list, currentTab);
      if (checkRepetiton === true) {
        alert("Recipe is already in your collection");
      } else {
        update(result.list, currentTab);
      }
    });
  });

  notification();
}

// Function to send message to background script to create page
function getRecipes() {
  chrome.runtime.sendMessage({ message: "give me recipe" });
}

// function to display notification
function notification() {
  var div = document.getElementById("showUsage");

  if (div.style.display == "none") {
    div.style.display = "block";
  }
}

// Append new value
function update(array, itemObj) {
  array.push(itemObj);
  chrome.storage.local.set({ list: array });
}

// Hide div
function hide() {
  var div = document.getElementById("showUsage");
  if (div.style.display == "block") {
    div.style.display = "none";
  }
}

// Checks if there is alredy given value of url
function urlRepeat(array, newUrl) {
  let repetition = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].url === newUrl.url) {
      repetition = true;
    }
  }
  return repetition;
}

// Send message to background to open random url
function goToUrl() {
  chrome.runtime.sendMessage({ message: "lucky wish" });
}
