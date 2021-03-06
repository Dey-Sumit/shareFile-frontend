import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { sizeInMB } from "../../../utils/sizeInMb";
import fileDownload from "js-file-download";

// add typescript
const download = ({ file: { id, filename, size } }) => {
  const handleDownload = async () => {
    const { data } = await axios(`/api/download/${id}`, {
      responseType: "blob", // Important
    });

    fileDownload(data, filename);
  };
  return (
    <div className="flex flex-col items-center justify-center py-3 space-y-3 bg-gray-800 rounded-md shadow-2xl w-96">
      {!id && (
        <span className=" w-80 button">
          oops! File Not Found, Check the URL
          <br />
          {/* Or the download link is expired */}
        </span>
      )}
      {id && (
        <>
          <img src="/images/file-download.png" alt="" className="w-16 h-16" />
          <h1 className="text-xl">Your file is ready to download</h1>
          <div className="flex items-center p-2 space-y-3 ">
            <img
              src={`/images/${filename.split(".")[1].toLowerCase()}.png`}
              alt={filename}
              className="w-14 h-14"
            />
            <span className="mx-2">{filename}</span>
            <span className="ml-auto ">{`${sizeInMB(size)} MB`}</span>
          </div>
          <button className="button" onClick={handleDownload}>
            Download
          </button>
        </>
      )}
    </div>
  );
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_ENDPOINT_SERVER}/api/files/${id}`
    );

    return {
      props: {
        file: data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        file: {},
      },
    };
  }
};
export default download;
