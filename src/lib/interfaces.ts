export interface AddFolder {
  name: string;
  route: string;
}
export interface DocIdProps {
  params: {
    documentId: string[];
  };
}
export interface IFolderAndFile {
  id: string;
  name: string;
  uuid: string;
  publishDate: number;
  downloadURL: string;
  type: string;
  size: number;
  isStar: boolean;
  creator: string;
}
