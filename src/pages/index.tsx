import axios from "axios";
import { useState } from "react";
import DownloadFile from "../components/DownloadFile";
import DropzoneComponent from "../components/DropzoneComponent";
import EmailForm from "../components/EmailForm";
import { sizeInMB } from "../utils/sizeInMb";
//TODO change render file name
interface IFile {
  name: string;
  type: string;
  size: number;
}

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
    <div className="flex flex-col items-center justify-center ">
      <h1 className="my-4 text-3xl font-medium">
        Got a file? Share it like fake news
      </h1>
      <div className="flex flex-col items-center justify-center bg-gray-800 shadow-2xl w-96 rounded-xl">
        {!downloadPageLink && <DropzoneComponent setFiles={setFiles} />}

        {/* show files */}
        {/* <RenderFile files={files} /> */}
        <div className="flex flex-col">
          {files?.map((file) => (
            <div key={file.name} className="flex items-center w-full my-2 ">
              <img
                src={`images/${file.type.split("/")[1]}.png`}
                alt={`${file.type.split("/")[1]}.png`}
                className="w-14 h-14"
              />
              <span className="mx-2">{file.name}</span>
              <span className="ml-auto ">{`${sizeInMB(file.size)} MB`}</span>
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default index;
