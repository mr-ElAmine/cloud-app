"use client";

import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { FileDown, FolderPlus, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import NewFolder from "./new-folder";
import ImportFiles from "./import-files";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useExists } from "@/hooks/use-exists";

const options = [
  [
    {
      value: "new-folder",
      label: (
        <div className="flex items-center gap-2">
          <FolderPlus />
          <p>New Folder</p>
        </div>
      ),
    },
  ],
  [
    {
      value: "import-files",
      label: (
        <div className="flex items-center gap-2">
          <FileDown />
          <p>Import files</p>
        </div>
      ),
    },
  ],
];

export default function ButtonNew({ isOpen }: { isOpen: boolean }) {
  const { userId } = useAuth();
  const params = useParams<{ documentId: string | string[] }>();
  const [selectChangen, setSelectChange] = useState<
    "new-folder" | "import-files"
  >("new-folder");

  const handleSelectChange = (value: string) => {
    setSelectChange("new-folder");
    if (value === "import-files") {
      setSelectChange(value);
    }
  };

  useExists(params, userId!)

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button className={`${isOpen ? "md:w-52" : "md:w-16"} w-full`}>
          <Plus />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            {selectChangen === "new-folder" ? (
              <div className="flex items-center gap-2">
                <FolderPlus />
                New Folder
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FileDown />
                Import Files
              </div>
            )}
          </CredenzaTitle>
          <CredenzaDescription className="text-left">
            Create a new folder or import both a folder and a file
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody className="w-full">
          <div className="flex flex-col gap-3 pb-5">
            <Label>Select an Option</Label>
            <Select
              onValueChange={handleSelectChange}
              defaultValue={selectChangen}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="py-2">
                  {options[0].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup className="py-2 border-t-2">
                  {options[1].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {selectChangen === "new-folder" ? <NewFolder /> : <ImportFiles />}
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
