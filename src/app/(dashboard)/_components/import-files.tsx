"use client";

import { Button } from "@/components/ui/button";
import { CredenzaClose } from "@/components/ui/credenza";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { FileCheck, Loader2, Trash2 } from "lucide-react";
import { addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@clerk/nextjs";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "sonner";
import { Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import { collectionRef, storageRef } from "@/lib/lists-actions";

export default function ImportFiles() {
  let documentId: string | null = null;
  const params = useParams<{ documentId: string | string[] }>();

  if (params) {
    if (Array.isArray(params.documentId)) {
      documentId = params.documentId.join("/");
    } else if (typeof params.documentId === "string") {
      documentId = params.documentId;
    }
  }
  const router = useRouter();

  const { userId } = useAuth();

  const deletFile = (index: number) => {
    const copylist = [...fileList];
    copylist.splice(index, 1);
    setfileList(copylist);
  };

  const [windowWidth, setWindowWidth] = useState(0);
  const [fileList, setfileList] = useState<File[]>([]);

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

  const formSchema = z.object({
    files: z
      .array(z.instanceof(File))
      .refine((data) => data.length > 0 && data.length <= 10),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { files: [] },
  });

  const { isValid } = form.formState;

  const onSubmit = async () => {
    fileList.forEach(async (file) => {
      const id = uuidv4();

      const uploadTask = uploadBytesResumable(
        storageRef(params, id, userId!),
        file
      );

      const uploadTaskPromise = new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            toast.promise(uploadTaskPromise, {
              loading: (
                <div className="flex gap-3 items-center">
                  <Spin
                    indicator={
                      <Loader2
                        color="#000000"
                        strokeWidth={2}
                        style={{ fontSize: 20 }}
                        className="animate-spin"
                      />
                    }
                  />
                  <div className="flex gap-1.5 items-center">
                    <p>Loading:</p>
                    <p>{file.name}</p>
                  </div>
                </div>
              ),
              success: (
                <div className="flex items-center gap-3 flex-col">
                  <FileCheck />
                  <div className="flex gap-1.5 items-center">
                    <p>{file.name}</p>
                    <p>He file has been added</p>
                  </div>
                </div>
              ),
              error: (
                <div className="flex gap-2 items-center">
                  <p>Error:</p>
                  <p>{file.name}</p>
                </div>
              ),
            });
          },
          (error) => {
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });

      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          let downloadURL = url;
          addDoc(collectionRef(params, "files", userId!), {
            isArchive: false,
            isDocument: true,
            uuid: id,
            name: file.name,
            size: file.size,
            type: file.type,
            creator: userId!.split("_")[1],
            publishDate: Date.now(),
            downloadURL: downloadURL,
          }).then(() => {
            router.refresh();
          });
        });

        toast(`Add file: ${file.name}`, {
          description: (
            <div className="flex items-center gap-1.5">
              <FileCheck /> He file has been added
            </div>
          ),
        });
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel>
                {fileList.length > 0
                  ? "The files you selected"
                  : "Click or drag files"}
              </FormLabel>
              <FormControl>
                {fileList.length > 0 ? (
                  <div className="flex flex-col gap-3 py-2">
                    {fileList.slice(0, 10).map((file, index) => (
                      <div
                        key={index}
                        className="text-xs flex gap-2 justify-between bg-gray-300/50 items-center rounded-md pl-2 p-1.5"
                      >
                        <p>
                          {file.name.length > Math.floor(windowWidth / 15)
                            ? `${file.name.slice(
                                0,
                                Math.floor(windowWidth / 15)
                              )}...`
                            : file.name}
                        </p>
                        <p
                          className="bg-gray-300 p-1 rounded-full"
                          onClick={() => {
                            deletFile(index);
                          }}
                        >
                          <Trash2 size={20} />
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Input
                    multiple
                    type="file"
                    accept="*/*"
                    onChange={(e) => {
                      field.onChange(Array.from(e.target.files!).slice(0, 10));
                      setfileList(Array.from(e.target.files!).slice(0, 10));
                    }}
                  />
                )}
              </FormControl>

              <FormDescription>
                {fileList.length > 0
                  ? "This is the names for your display files"
                  : "You can select maximum 10 files"}
              </FormDescription>
            </div>
          )}
        />
        <div className="flex gap-2 md:flex-row flex-col pb-3">
          <CredenzaClose asChild className="w-full">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </CredenzaClose>
          <CredenzaClose asChild>
            <Button
              disabled={!isValid || fileList.length == 0}
              className="w-full"
              type="submit"
            >
              Continue
            </Button>
          </CredenzaClose>
        </div>
      </form>
    </Form>
  );
}
