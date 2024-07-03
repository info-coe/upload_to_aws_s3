import "./App.css";
import UploadComponent from "./components/Uploader";
// import Uploader from "./components/Uploader";

function App() {
  return (
    <div className="App" basename="upload_to_aws_s3">
      {/* <Uploader /> */}
      <UploadComponent/>
    </div>
  );
}

export default App;
