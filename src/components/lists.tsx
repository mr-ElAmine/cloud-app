import ListItem from "./lists-item";
import { IFolderAndFile } from "../lib/interfaces";
import { auth } from "@clerk/nextjs";

export default function Lists({
  files,
  folders,
  path,
}: {
  files: IFolderAndFile[];
  folders: IFolderAndFile[];
  path: "dashboard" | "starred";
}) {
  const { userId } = auth();

  return (
    <div>
      <div className="py-5 flex gap-3 flex-wrap justify-center items-center">
        {[...folders, ...files].map((folder) => (
          <ListItem
            key={folder.id}
            item={folder}
            userId={userId!}
            path={path}
          />
        ))}
      </div>
    </div>
  );
}
