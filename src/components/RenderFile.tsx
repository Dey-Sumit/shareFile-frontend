import { FunctionComponent } from "react";
import { sizeInMB } from "../utils/sizeInMb";
interface IFile {
  name: string;
  type: string;
  size: number;
}
const RenderFile: FunctionComponent<{ files: IFile[] }> = ({ files }) => {
  return (
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
  );
};

export default RenderFile;
