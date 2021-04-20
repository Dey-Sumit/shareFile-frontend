import axios from "axios";
import { useState } from "react";
import DownloadFile from "../components/DownloadFile";
import DropzoneComponent from "../components/DropzoneComponent";
import EmailForm from "../components/EmailForm";
//TODO change render file name
const index = () => {
  const [files, setFiles] = useState(null);

  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState("Upload");
  const resetComponent = () => {
    setFiles(null);
    setDownloadPageLink(null);
  };

  const handleUpload = async () => {
    setUploadState("Uploading");
    const formData = new FormData();

    formData.append("myFile", files[0]);
    try {
      const { data } = await axios({
        method: "post",
        url: "/api/files/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
    } catch (error) {
      console.log(error);
      setUploadState("Upload Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center shadow-2xl bg-gray-50 w-96 rounded-xl">
      {!downloadPageLink && <DropzoneComponent setFiles={setFiles} />}

      {/* show files */}
      {/* <renderFiles/> */}

      {/* //upload button */}
      {files?.length > 0 && !downloadPageLink && (
        <button className="button" onClick={handleUpload}>
          {uploadState}
        </button>
      )}
      {/* // copy link */}
      {downloadPageLink && (
        <div className="p-2 text-center">
          <DownloadFile downloadPageLink={downloadPageLink} />

          <EmailForm id={id} />

          <button onClick={resetComponent} className=" button w-44">
            Upload new File
          </button>
        </div>
      )}
    </div>
  );
};

export default index;