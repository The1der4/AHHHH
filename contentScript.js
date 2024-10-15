(() => {
    let youtubeLeftContorls, youtubePlayer; //accessing the youtube player and control
    let currentVideo = "";
    
    //listen to the background.js message
    chrome.runtime.onMessage.addListener((obj, sender, response) => { 
        //when a message in sent to contentscript, we can also send a response back where the message is coming from.
        //destructure the value we are getting
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        // check if a bookmark button is already exist
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0]

        if(!bookmarkBtnExists) {
            const //start here
        }

    }

})();


