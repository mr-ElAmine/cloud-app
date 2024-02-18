import { collectionRef, documentId } from "@/lib/lists-actions";
import { getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export function useExists(
  params: {
    documentId: string | string[];
  } | null,
  userId: string
) {
  const { push } = useRouter();
  const documentIds = documentId(params, userId);
  if (documentIds) {
    const collectionRefs = collectionRef(params, "folders", userId);
    const docRef = collectionRefs.parent;
    if (docRef !== null) {
      getDoc(docRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists() === false) {
            push("/dashboard");
          }
        })
        .catch((error) => {
          push("/dashboard");
        });
    }
  }
}
