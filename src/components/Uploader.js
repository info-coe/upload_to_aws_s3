import React, {useState} from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const cors = require('cors');

const Uploader = () => {
  const axios = require("axios").default;
  const [token,setToken] = useState("");

  const API_ENDPOINT =
    "https://16jkxdhqgg.execute-api.us-east-1.amazonaws.com/development/";
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (files) => {
    // console.log(e);
    const f = files[0];
    console.log(f["file"]);
    // * GET request: presigned URL
    axios.get(API_ENDPOINT,{
      headers : {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        // "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        authorizationToken : token
      }
    }).then((response) => {
      console.log("Response: ", response);
      console.log(JSON.parse(response.data.body.toString()));

      const uploadLink = JSON.parse(response.data.body).uploadURL;
      console.log("Upload Link: ", uploadLink);
      // * PUT request: upload file to S3
      axios.put(uploadLink, f["file"]).then((response) => {
            console.log("Response: ", response);
            alert("File uploaded to AWS successfully");
          }).catch((error)=>{
            console.log(error);
            alert("Error");
          });
      // const result = fetch(uploadLink, {
      //   method: "PUT",
      //   body: f["file"],
      // });
      // console.log("Result: ", result);
    }).catch((error)=>{
      console.log(error);
      alert("Error");
    });
  };

  return (
    <div className="uploader">
      <div id="token">
        <label>Enter Authorization Token </label>
        <input id="token" type="password" onChange={(e)=>setToken(e.target.value)} autoFocus required/>
        {/* <button type="button" onClick={handleSubmit}>Submit</button> */}
      </div>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: "green" },
        }}
      />
    </div>
  
  );
};

<Uploader />;

export default Uploader;