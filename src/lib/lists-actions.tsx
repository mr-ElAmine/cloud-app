import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref } from "firebase/storage";

export const collectionRef = (
  params: {
    documentId: string | string[];
  } | null,
  type: "files" | "folders",
  userId: string
) => {
  let documentId: string | null = null;

  if (params) {
    if (Array.isArray(params.documentId)) {
      documentId = params.documentId.join(`/folders_${userId!.split("_")[1]}/`);
    } else if (typeof params.documentId === "string") {
      documentId = params.documentId;
    }
  }

  return documentId
    ? collection(
        db,
        `/folders_${userId!.split("_")[1]}/`,
        documentId,
        `${type}_${userId!.split("_")[1]}/`
      )
    : collection(db, `${type}_${userId!.split("_")[1]}`);
};

export const documentId = (
  params: {
    documentId: string | string[];
  } | null,
  userId: string
) => {
  let documentId: string | null = null;

  if (params) {
    if (Array.isArray(params.documentId)) {
      documentId = params.documentId.join(`/folders_${userId!.split("_")[1]}/`);
    } else if (typeof params.documentId === "string") {
      documentId = params.documentId;
    }
  }

  return documentId;
};

export const storageRef = (
  params: {
    documentId: string | string[];
  } | null,
  id: string,
  userId: string
) => {
  let documentId: string | null = null;

  if (params) {
    if (Array.isArray(params.documentId)) {
      documentId = params.documentId.join(`/folders_${userId!.split("_")[1]}/`);
    } else if (typeof params.documentId === "string") {
      documentId = params.documentId;
    }
  }
  return documentId
    ? ref(storage, `${userId!.split("_")[1]}/${documentId}/${id}`)
    : ref(storage, `${userId!.split("_")[1]}/${id}`);
};

export const refs = (
  params: {
    documentId: string | string[];
  } | null,
  userId: string,
  id: string,
  type: "files" | "folders"
) => {
  let documentId: string | null = null;

  if (params) {
    if (Array.isArray(params.documentId)) {
      documentId = params.documentId.join(`/folders_${userId!.split("_")[1]}/`);
    } else if (typeof params.documentId === "string") {
      documentId = params.documentId;
    }
  }

  return documentId
    ? doc(
        db,
        `/folders_${userId!.split("_")[1]}/`,
        documentId,
        `${type}_${userId!.split("_")[1]}/`,
        id
      )
    : doc(db, `${type}_${userId!.split("_")[1]}/`, id);
};
