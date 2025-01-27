export interface FileInterface {
  _id: string;
  fileName: string;
  fileUrl: string;
  type: "file";
}

export interface SubFolderInterface {
  _id: string;
  folderName: string;
  type: "folder";
}

export interface FolderInterface {
  _id: string;
  folderName: string;
  type: "folder";
  files: FileInterface[];
  subFolders: SubFolderInterface[];
  userId: string;
}
