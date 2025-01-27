import FolderBroswer from "./FolderBroswer";
import FolderCreater from "./FolderCreater";

function Folders() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10">
      <div className="md:col-span-2">
        <FolderCreater />
      </div>
      <div className="md:col-span-8">
        <FolderBroswer />
      </div>
    </div>
  );
}

export default Folders;
