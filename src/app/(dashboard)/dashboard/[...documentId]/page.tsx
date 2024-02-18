import ListItem from "@/components/lists-item";
import { DocIdProps } from "@/lib/interfaces";
import { collectionRef } from "@/lib/lists-actions";
import { auth } from "@clerk/nextjs";
import { getDocs, query, where } from "firebase/firestore";

export default async function DocumentIdPage({ params }: DocIdProps) {
  const getData = async (
    type: "files" | "folders",
    userId: string
  ) => {
    let types: any[] = [];
    const q = query(
      collectionRef(params, type, userId),
      where("isArchive", "==", false)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      types.push({ ...doc.data(), id: doc.id });
    });
    return types;
  };

  const { userId } = auth();
  const folders = await getData("folders", userId!);
  const files = await getData("files", userId!);
  return (
    <div
      className={`${
        folders.length > 0 || files.length > 0
          ? ""
          : "flex justify-center items-center"
      } h-full`}
    >
      {folders.length > 0 || files.length > 0 ? (
        <div className="py-5 flex gap-3 flex-wrap justify-center items-center">
          {[...folders, ...files].map((folder) => (
            <ListItem
              key={folder.id}
              item={folder}
              userId={userId!}
              path="dashboard"
            />
          ))}
        </div>
      ) : (
        <div className="flex h-10 w-full justify-center items-center">
          <div className="font-semibold">There are no files or folders.</div>
        </div>
      )}
    </div>
  );
}
