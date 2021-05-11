import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropzoneComponent({ setFiles }) {
  const onDrop = useCallback((acceptedFile) => {
    setFiles(acceptedFile);
    console.log(acceptedFile);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png,application/pdf,audio/mpeg",
    multiple: false,
  });

  return (
    <div className="flex flex-col w-full p-4">
      <div
        {...getRootProps()}
        className="w-full mx-auto rounded-md cursor-pointer h-80 focus:outline-none"
      >
        <input {...getInputProps()} />
        <div
          className={
            "border-yellow-light flex-col flex bg-gray-800  justify-center items-center h-full rounded-xl border-2 border-dashed p-2 space-y-3 " +
            (isDragReject === true ? "border-red-500 " : " ") +
            (isDragAccept === true ? "border-green-500 " : " ")
          }
        >
          <img src="folder.png" alt="folder" className="w-16 h-16" />
          <div className="text-lg text-center">
            {isDragReject === true ? (
              <p>Sorry , this app only support images , pdf and mp3"</p>
            ) : (
              <div>
                <p>Drag and Drop the file here</p>
                <p className="mt-2 text-base text-gray-300">
                  Only jpeg , png , mp3 & pdf files supported
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropzoneComponent;
// https://www.freakyjolly.com/react-upload-files-using-react-dropzone/
