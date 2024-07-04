import React, { useState } from 'react';
import axios from 'axios';
import mime from 'mime-types';

const UploadComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert('Please select files');
      return;
    }

    selectedFiles.forEach((file) => {
      // Prepare FormData with the file and filename
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);

      // Send a GET request to your API Gateway endpoint to get the pre-signed URL and file key
      axios.get('https://16jkxdhqgg.execute-api.us-east-1.amazonaws.com/development/', {
        headers: {
          authorizationToken: "authorizer",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*",
        }
      }).then((response) => {
        const uploadUrl = JSON.parse(response.data.body).uploadUrl;
        console.log(response);
        console.log(uploadUrl);

        // Send a PUT request to the pre-signed URL with the file content
        axios.put(uploadUrl, file, {
          headers: {
            'Content-Type': mime.lookup(file.name) || 'application/octet-stream'
          }
        }).then((res) => {
          console.log(res);
          alert(`File ${file.name} uploaded successfully to S3`);
          // setSelectedFiles([]);
          window.location.reload(false);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((error) => {
        console.error('Error uploading file to S3:', error);
      });
    });
  };

  const handleRemoveFile = (fileToRemove) => {
    setSelectedFiles(selectedFiles.filter(file => file !== fileToRemove));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
      <div>
        <h3>Selected Files:</h3>
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              {file.name} <button onClick={() => handleRemoveFile(file)}>Cancel</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadComponent;



// import React, { useState } from 'react';
// import axios from 'axios';
// import mime from 'mime-types';

// const UploadComponent = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       alert('Please select a file');
//       return;
//     }
//       // Prepare FormData with the file and filename
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('filename', selectedFile.name);

//       // Send a POST request to your API Gateway endpoint to get the pre-signed URL and file key
//       axios.get('https://16jkxdhqgg.execute-api.us-east-1.amazonaws.com/development/',  {
//         headers: {
//           authorizationToken : "authorizer",
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Headers": "*",
//           // "Access-Control-Request-Headers": "*",
//           "Access-Control-Allow-Methods": "*",
//         }
//       }).then((response) => {
//         const uploadUrl = JSON.parse(response.data.body).uploadUrl;
//         console.log(response);
//         console.log(uploadUrl);
  
//         // Send a PUT request to the pre-signed URL with the file content
//         axios.put(uploadUrl, selectedFile, {
//           headers: {
//             'Content-Type': mime.lookup(selectedFile.name) || 'application/octet-stream'
//           }
//         }).then((res)=>{
//           console.log(res);
//           alert(`File uploaded successfully to S3`);
//           window.location.reload(false);
//         }).catch((err)=>{
//           console.log(err);
//         });
//       }).catch((error) => {
//       console.error('Error uploading file to S3:', error);
//     });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default UploadComponent;


// import React, {useState} from "react";
// import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from "react-dropzone-uploader";

// const cors = require('cors');

// const Uploader = () => {
//   const axios = require("axios").default;
//   const [token,setToken] = useState("");

//   const API_ENDPOINT =
//     "https://16jkxdhqgg.execute-api.us-east-1.amazonaws.com/development/";
//   const handleChangeStatus = ({ meta, remove }, status) => {
//     console.log(status, meta);
//   };

//   const handleSubmit = (files) => {
//     // console.log(e);
//     const f = files[0];
//     console.log(f["file"]);
//     // * GET request: presigned URL
//     axios.get(API_ENDPOINT,{
//       headers : {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         // "Access-Control-Request-Headers": "*",
//         "Access-Control-Allow-Methods": "*",
//         authorizationToken : token
//       }
//     }).then((response) => {
//       console.log("Response: ", response);
//       console.log(JSON.parse(response.data.body.toString()));

//       const uploadLink = JSON.parse(response.data.body).uploadURL;
//       console.log("Upload Link: ", uploadLink);
//       // * PUT request: upload file to S3
//       axios.put(uploadLink,{
//         body : f["file"].name,
//         headers : {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Headers": "*",
//           // "Access-Control-Request-Headers": "*",
//           "Access-Control-Allow-Methods": "*",
//         }
//       }).then((response) => {
//             console.log("Response: ", response);
//             alert("File uploaded to AWS successfully");
//           }).catch((error)=>{
//             console.log(error.message);
//             alert("Error");
//           });
//       // const result = fetch(uploadLink, {
//       //   method: "PUT",
//       //   body: f["file"],
//       // });
//       // console.log("Result: ", result);
//     }).catch((error)=>{
//       console.log(error);
//       alert("Error");
//     });
//   };

//   return (
//     <div className="uploader">
//       <div id="token">
//         <label>Enter Authorization Token </label>
//         <input id="token" type="password" onChange={(e)=>setToken(e.target.value)} autoFocus required/>
//         {/* <button type="button" onClick={handleSubmit}>Submit</button> */}
//       </div>
//       <Dropzone
//         onChangeStatus={handleChangeStatus}
//         onSubmit={handleSubmit}
//         maxFiles={1}
//         multiple={false}
//         canCancel={false}
//         inputContent="Drop A File"
//         styles={{
//           dropzone: { width: 400, height: 200 },
//           dropzoneActive: { borderColor: "green" },
//         }}
//       />
//     </div>
  
//   );
// };

// <Uploader />;

// export default Uploader;