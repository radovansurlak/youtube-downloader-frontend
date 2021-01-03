import React, { useEffect } from "react";
import getYouTubeID from "get-youtube-id";
import fileDownload from "js-file-download";
import axios from "axios";

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoURL = urlParams.get("videoURL");
    let videoID;

    if (videoURL) {
      videoID = getYouTubeID(videoURL);

      axios({
        url: `https://yeetube.herokuapp.com/download/${videoID}`,
        method: "POST",
        responseType: "blob",
      }).then((res) => {
        fileDownload(res.data, res.headers.filename);
      });
    }
  }, []);

  return <h1>This is an AHSOME YeeTube downloader baby</h1>;
}

export default App;
