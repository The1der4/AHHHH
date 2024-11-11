(() => {
    let youtubeLeftContorls, youtubePlayer; //accessing the youtube player and control
    let currentVideo = "";
    
    //listen to the background.js message
    chrome.runtime.onMessage.addListener((obj, sender, response) => { 
        //when a message in sent to contentscript, we can also send a response back where the message is coming from.
        //destructure the value we are getting
        const { type, value, videoId } = obj;

        if (type === "NEW") { // if the video type is new 
            currentVideo = videoId;
            newVideoLoaded(); // call a function to handle any action from new video
        }
    });

    const newVideoLoaded = () => {
        // check if a bookmark button is already exist
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];

        if(!bookmarkBtnExists) { // logic that fetch if the bookmark button exist to add any youtube video to a bookmark
            const bookmarkBtn = document.createElement("img"); // create an image element to a button we going to click on
            
            bookmarkBtn.src = chome.runtime.getURL("assets/bookmark.png") // pull the image we are using
            bookmarkBtn.className = "ytp-button " + "bookmark-btn"; // make it dynamic here, not pretty know what he mean
            bookmarkBtn.title = "Click to bookmark current timestamp";
            
            youtubeLeftContorls = document.getElementsByClassName("ytp-left-controls")[0];
                //selects all elements in the DOM that have the class name "ytp-left-controls",
                //[0] accesses the first element in that collection, which is the left controls area of the YouTube player.
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
                //"video-stream" is used for the main video player element where the YouTube video itself is rendered.
                //[0] selects the first video player on the page.
                
            youtubeLeftContorls.appendChild(bookmarkBtn); // add the bookmark button to the row("ytp-left-controls") we grabbed.
            // add a listener to listen to any click on our icon.
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }
    /*in manifest.json file, we have a match pattern for our content script. And basically the match pattern,
    we currently have checks if any youtube.com video is loaded. And if is,
    we're injecting our content script into the context of that webpage. So basically what that mean is,
    anytime a youtube.com page shows up, we're running a bunch of logic using our content script.
    But the problem right now is that our background.js file is telling us when a new video is loaded.
    And the event listener we're using is on updated ,which is just checking if this URL is updated.
    If you refresh the page, the URL is no updated. So bookmarkBtn actaully isnt going to show up.
    And if you continue coding without this fix right here, you're gonna see some edge case that you might no like.
    */
    newVideoLoaded();
    /* Anytime our contentcript matches youtube.com,
    and this going to do is call the newVideoLoaded function anytime we hit the match pattern. 
    The downside of this is now if the background script sees it as a new video,
    using the on updated event listener, and there's a condition that content script is injected,
    we're going to hit this or call this newVideoLoaded function twice,
    you can fix this pretty easily by just adding a conditional make sure that doesn't happen.
    */ 

})();


