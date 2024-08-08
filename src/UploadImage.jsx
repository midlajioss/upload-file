import React, { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState();
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    console.log(url.split("/").pop());
    link.download = url.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = () => {
    setLoading('')
    setUrl('')
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function...
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setLoading(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          // Complete function...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            console.log(url);
          });
        }
      );
    }
  };
  const handleCopyLink = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying link:", error);
      });
  };
  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      {url && <button onClick={() => handleDownload(url)}>Download</button>}
      <br/>
      {loading < 100 ? (
        <>
        <div
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
            maxWidth: "271px",
            minWidth: "271px",
            borderRadius: "4px",
            marginTop: "10px",
            marginLeft: "20px",
          }}
        >
          <div
            style={{
              color: "#00b300",
              backgroundColor: "#00b300",
              borderRadius: "5px",
              width: `${loading}%`,
            }}
          >
            .
          </div>
        </div>
        </>
        
      ) : (
        loading > 99 && (
          <p>
             <p>Upload successfully Completed</p>
             <img style={{
               maxWidth: "40px",
               minWidth: "40px",
               marginTop: "10px",
               marginLeft: "20px",
             }} src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/done-icon.png" />
          </p>
        )
      )}
            {url ? (
        <>
          <p>{url}</p>
          <button onClick={() => handleCopyLink(url)}>Copy Link</button>
        </>
      ): loading > 99 && (
       <p  style={{color: "#00b300"}}>Please Wite Your Link is Ready</p>
      )}
    </div>
  );
}

export default UploadImage;
