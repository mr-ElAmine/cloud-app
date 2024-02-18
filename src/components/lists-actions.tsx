"use client";
import {
  Download,
  MoreVertical,
  Pencil,
  Star,
  Trash,
  UserPlus,
} from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { deleteDoc, setDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { IFolderAndFile } from "@/lib/interfaces";
import { refs } from "@/lib/lists-actions";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";
import ConfirmModal from "./ui/confirm-modal";

interface ListActionProps {
  item: IFolderAndFile;
  onStartEditing?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  userId: string;
}

const ListAction = ({ item, onStartEditing, userId }: ListActionProps) => {
  const { refresh } = useRouter();

  const params = useParams<{ documentId: string | string[] }>();
  const type = item.size ? "files" : "folders";
  const refDoc = refs(params, userId!, item.id, type);

  const onDelete = () => {
    const Refs = refs(params, userId!, item.id, type);

    if (type === "folders") {
      const promise = deleteDoc(Refs).then(() => refresh());

      toast.promise(promise, {
        loading: "Loading...",
        success: "Deleted !",
        error: "Failed to delete.",
      });
    }

    if (type === "files") {
      const promise = deleteObject(ref(storage, item.downloadURL)).then(() => {
        deleteDoc(Refs).then(() => refresh());
      });

      toast.promise(promise, {
        loading: "Loading...",
        success: "Deleted !",
        error: "Failed to delete.",
      });
    }
  };

  const onAddStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    const promise = setDoc(refDoc, {
      ...item,
      isStar: true,
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Starred !",
      error: "Failed to star.",
    });
  };

  const onRemoveStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    const promise = setDoc(refDoc, {
      ...item,
      isStar: false,
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Unstarred !",
      error: "Failed to unstar.",
    });
  };

  const onDownload = () => {
    if (!item.size) {
      toast.error("This is a folder, not a file.");
      return;
    }

    window.open(item.downloadURL, "_blank");
  };

  return (
    <div className="flex items-center space-x-1 pl-1">
      <ConfirmModal onConfirm={onDelete}>
      <div
        role="role"
        className="p-2 hover:bg-gray-200 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Trash className="w-4 h-4 opacity-50" />
      </div>
      </ConfirmModal>
      <div role="button">
        {item.isStar ? (
          <div
            role="button"
            className="p-2 hover:bg-gray-200 rounded-full transition"
            onClick={onRemoveStar}
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        ) : (
          <div
            role="button"
            className="p-2 hover:bg-gray-200  rounded-full transition"
            onClick={onAddStar}
          >
            <Star className="w-4 h-4 opacity-50" />
          </div>
        )}
      </div>
      <Popover>
        <PopoverTrigger>
          <div
            role="button"
            className=" p-2 hover:bg-gray-300 rounded-full transition"
          >
            <MoreVertical className="h-4 w-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 mx-4">
          {item.size && (
            <div
              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
              role="button"
              onClick={onDownload}
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </div>
          )}

          <div
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
            role="button"
            onClick={onStartEditing}
          >
            <Pencil className="w-4 h-4" />
            <span>Rename</span>
          </div>

          <Separator />

          <Separator />
          <ConfirmModal onConfirm={onDelete}>
            <div
              className="w-full flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
              role="button"
            >
              <Trash className="w-4 h-4" />
              <span>Delete</span>
            </div>
          </ConfirmModal>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ListAction;
