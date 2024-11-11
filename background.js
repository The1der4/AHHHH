/*
1. Listen to any updates in our tab system.
2. Find the most recently tab or the tab we're on currently.
3. See if the currently tab is a Youtube page.
*/

//making listener that listen to tab, and listen the update to tabs
chrome.tab.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) { // make sure we're on a page that we are watching youtube
        const queryParameters = tab.url.split("?")[1];  //queryParameters as a unique ID for each video,to easily grab it from storage
        const urlParameters = new URLSearchParams(queryParameters); //An interface to work with urls **not pretty sure what it means**

        //Messaging system between the extension.
        //Sent message to contentscript that basically says a new video is loaded. Sending the video ID.
        chrome.tabs.sendMessage(tabId, { //sendmessage takes a tab ID that takes a unique object
            type: "NEW", //sent that this is a new event
            videoId: urlParameters.get("v")
        });
    }
}); 