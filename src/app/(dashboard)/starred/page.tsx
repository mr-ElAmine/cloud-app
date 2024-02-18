import Lists from "../../../components/lists";
import { collectionRef } from "@/lib/lists-actions";
import { auth } from "@clerk/nextjs";
import { getDocs, query, where } from "firebase/firestore";

export default async function StarredPage() {
  const getData = async (
    creator: string,
    type: "files" | "folders",
    userId: string
  ) => {
    let types: any[] = [];
    const q = query(
      collectionRef(null, type, userId),
      where("creator", "==", creator),
      where("isArchive", "==", false),
      where("isStar", "==", true)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      types.push({ ...doc.data(), id: doc.id });
    });

    return types;
  };

  const { userId } = auth();
  const folders = await getData(userId!.split("_")[1], "folders", userId!);
  const files = await getData(userId!.split("_")[1], "files", userId!);

  return (
    <div
      className={`${
        folders.length > 0 || files.length > 0
          ? ""
          : "flex justify-center items-center"
      } h-full`}
    >
      {folders.length > 0 || files.length > 0 ? (
        <Lists
          folders={JSON.parse(JSON.stringify(folders))}
          files={JSON.parse(JSON.stringify(files))}
          path="starred"
        />
      ) : (
        <div className="flex h-10 w-full justify-center items-center">
          <div className="font-semibold">There are no files or folders.</div>
        </div>
      )}
    </div>
  );
}
