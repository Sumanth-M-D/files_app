import { FileInterface } from "../../interfaces/folderInterface";
import { FaFile } from "react-icons/fa";

function FileComponent({ file }: { file: FileInterface }) {
  return (
    <div className="flex flex-col items-center  w-24 gap-1 ">
      <FaFile className="text-4xl" />
      <p className="text-sm text-center">{file.fileName}</p>
    </div>
  );
}

export default FileComponent;
