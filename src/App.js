import React, { useEffect, useState } from "react";
import getYouTubeID from "get-youtube-id";
import fileDownload from "js-file-download";
import axios from "axios";

function App() {
  const [downloadPercentage, setDownloadPercentage] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoURL = urlParams.get("videoURL");
    let videoID;

    if (videoURL) {
      setIsDownloading(true);
      videoID = getYouTubeID(videoURL);

      axios({
        url: `https://yeetube.herokuapp.com/download/${videoID}`,
        // url: `http://localhost:4000/download/${videoID}`,
        method: "POST",
        responseType: "blob",
        onDownloadProgress(progress) {
          const percentageProgress = Math.round(
            (progress.loaded / progress.total) * 100
          );
          setDownloadPercentage(percentageProgress);
        },
      }).then((res) => {
        setIsDownloading(false);
        fileDownload(res.data, res.headers.filename);
      });
    }
  }, []);

  return <>{isDownloading && <h1>{downloadPercentage}%</h1>}</>;
}

export default App;
