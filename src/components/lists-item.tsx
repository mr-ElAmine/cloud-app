"use client";
import {
  ArrowRightFromLine,
  File,
  Folder,
  Save,
  User,
  Users,
  X,
} from "lucide-react";
import { IFolderAndFile } from "@/lib/interfaces";
import ListAction from "./lists-actions";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { refs } from "@/lib/lists-actions";
import { setDoc } from "firebase/firestore";

export function byteConverter(bytes: number, decimals?: number, only?: string) {
  const K_UNIT = 1024;
  const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

  if (bytes == 0) return "0 Byte";

  if (only === "MB")
    return (bytes / (K_UNIT * K_UNIT)).toFixed(decimals) + " MB";

  let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
  let resp =
    parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) +
    " " +
    SIZES[i];

  return resp;
}
export default function ListItem({
  item,
  userId,
  path,
}: {
  item: IFolderAndFile;
  userId: string;
  path: "dashboard" | "starred" | "sharing";
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const date = new Date(item.publishDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedDate = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year} ${hours}:${minutes}:${seconds}`;

  const params = useParams<{ documentId: string | string[] }>();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [value, setValue] = useState(item.name);

  const inputRef = useRef<ElementRef<"input">>(null);
  const { refresh, push } = useRouter();
  let push_route = `${path}/${item.id}`;
  if (params) {
    if (Array.isArray(params.documentId)) {
      push_route = `${path}/${params.documentId.join("/")}/${item.id}`;
    } else if (typeof params.documentId === "string") {
      push_route = `${path}/${params.documentId}/${item.id}`;
    }
  }

  const onStartEditing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, value.length);
    }, 0);
  };

  const onSave = () => {
    const type = item.size ? "files" : "folders";
    const ref = refs(params, userId!, item.id, type);

    const promise = setDoc(ref, {
      ...item,
      name: /^\s*$/.test(value) ? "Untitled" : value,
    }).then(() => {
      setIsEditing(false);
      refresh();
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Saved !",
      error: "Failed to save.",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <>
      <Card className="p-0 w-full group flex border-2">
        <div className="w-full">
          <CardHeader className="p-4">
            <CardTitle className="flex gap-2 items-center" role="button">
              <p
                className="font-medium flex gap-1.5 text-sm items-center"
                onDoubleClick={onStartEditing}
              >
                <Drawer open={isEditing}>
                  <DrawerTrigger>
                    <div onDoubleClick={onStartEditing} role="button">
                      {item.size ? <File size={25} /> : <Folder size={25} />}
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="flex items-center justify-center flex-col">
                      <DrawerHeader className="max-w-2xl p-0">
                        <DrawerHeader>
                          <DrawerTitle className="text-start">
                            You rename your
                            {item.size ? " file" : " folder"}
                          </DrawerTitle>
                          <DrawerDescription className="text-start">
                            You are about to change the name of this
                            {item.size ? " file" : " folder"}
                          </DrawerDescription>
                          <DrawerHeader className="p-0">
                            <Input
                              className="w-full"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              ref={inputRef}
                              onKeyDown={onKeyDown}
                            />
                          </DrawerHeader>
                        </DrawerHeader>
                        <DrawerFooter className="flex md:flex-row flex-col w-full p-3">
                          <DrawerClose className="w-full" onClick={onSave}>
                            <Button
                              size={"icon"}
                              className="w-full"
                              onClick={onSave}
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                          </DrawerClose>
                          <DrawerClose
                            className="w-full"
                            onClick={() => setIsEditing(false)}
                          >
                            <Button
                              size={"icon"}
                              className="w-full"
                              variant="outline"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerHeader>
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>

                {item.name.length > Math.floor(windowWidth / 15)
                  ? `${item.name.slice(0, Math.floor(windowWidth / 15))}...`
                  : item.name}
              </p>
            </CardTitle>
            <CardDescription className="text-xs font-bold">
              {formattedDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="w-full flex items-center justify-end p-2 text-sm font-medium gap-2">
              <div>{item.size ? byteConverter(item.size) : null}</div>
            </div>
          </CardContent>
          <CardFooter className="p-2">
            <div className="w-full flex items-center justify-end">
              <ListAction
                item={item}
                onStartEditing={onStartEditing}
                userId={userId}
              />
            </div>
          </CardFooter>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          {item.size ? null : (
            <div
              role="button"
              className="p-2 bg-gray-200 hover:bg-gray-300 h-full flex items-center"
              onClick={() => {
                push(`/${push_route}`);
              }}
            >
              <ArrowRightFromLine size={20} />
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
