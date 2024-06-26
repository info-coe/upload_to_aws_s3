import React, {useState} from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const cors = require('cors');

const Uploader = () => {
  const axios = require("axios").default;
  const [token,setToken] = useState("");

  const API_ENDPOINT =
    "https://r0lznapmr7.execute-api.us-east-1.amazonaws.com/upload-stage/";
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = async (files) => {
    // console.log(e);
    const f = files[0];
    console.log(f["file"]);
    // * GET request: presigned URL
    try{
      const response = await axios.get(API_ENDPOINT,{
        headers : {
          "Access-Control-Allow-Origin": "*",
          authorizationToken : token
        }
      });

      console.log("Response: ", response);
      console.log(JSON.parse(response.data.body.toString()));

      const uploadLink = JSON.parse(response.data.body).uploadURL;
      console.log("Upload Link: ", uploadLink);

      // * PUT request: upload file to S3
      // const result = await fetch(uploadLink, {
      //   method: "PUT",
      //   body: f["file"],
      // });
      // console.log("Result: ", result);
      // alert("File uploaded to AWS successfully");

    }
    catch(error){
      console.log(error);
      alert("Error");
    }
  };

  return (
    <div className="uploader">
      <div id="token">
        <label>Enter Authorization Token </label>
        <input id="token" type="password" onChange={(e)=>setToken(e.target.value)} autoFocus required/>
        <button type="button" onClick={handleSubmit}>Submit</button>
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
// // import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

// // const client = new S3Client({});

// // export const Main = async () => {
// //   const command = new GetObjectCommand({
// //     Bucket: "test-bucket",
// //     Key: "hello-s3.txt",
// //   });

// //   try {
// //     const response = await client.send(command);
// //     // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
// //     const str = await response.Body.transformToString();
// //     console.log(str);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };
