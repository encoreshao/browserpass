"use strict";

var app = "com.dannyvankooten.browserpass";

chrome.runtime.onMessage.addListener(onMessage);

// fill login form & submit
function fillLoginForm(login) {
  const loginParam = JSON.stringify(login);
  const autoSubmitParam = JSON.stringify(localStorage.getItem("autoSubmit"));

  chrome.tabs.executeScript(
    {
      allFrames: true,
      file: "/inject.js"
    },
    function() {
      chrome.tabs.executeScript({
        allFrames: true,
        code: `browserpassFillForm(${loginParam}, ${autoSubmitParam});`
      });
    }
  );
}

function onMessage(request, sender, sendResponse) {
  if (request.action == "login") {
    chrome.runtime.sendNativeMessage(
      app,
      { action: "get", entry: request.entry },
      function(response) {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        }

        chrome.tabs.query({ currentWindow: true, active: true }, function(
          tabs
        ) {
          // do not send login data to page if URL changed during search.
          if (tabs[0].url == request.urlDuringSearch) {
            fillLoginForm(response, request.urlDuringSearch);
          }
        });
        sendResponse();
      }
    );
  }
}
