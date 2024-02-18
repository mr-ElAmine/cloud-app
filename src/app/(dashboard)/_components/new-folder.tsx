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
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { FolderCheck } from "lucide-react";
import { collectionRef } from "@/lib/lists-actions";

export default function NewFolder() {
  const { userId } = useAuth();
  const params = useParams<{ documentId: string | string[] }>();

  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(2).max(256),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const { isValid } = form.formState;

  const onSubmit = async (folder: z.infer<typeof formSchema>) => {
    addDoc(collectionRef(params, "folders", userId!), {
      isArchive: false,
      isDocument: false,
      uuid: uuidv4(),
      name: folder.name,
      creator: userId!.split("_")[1],
      publishDate: Date.now(),
    }).then(() => {
      router.refresh();
      form.reset();
    });

    toast(`Add folder: ${folder.name}`, {
      description: (
        <div className="flex items-center gap-1.5">
          <FolderCheck />
          He folder has been added
        </div>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel>Name Folder</FormLabel>
              <FormControl>
                <Input placeholder="Name folder..." {...field} />
              </FormControl>
              <FormDescription>
                This is the name for your display folder
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
            <Button className="w-full" disabled={!isValid} type="submit">
              Continue
            </Button>
          </CredenzaClose>
        </div>
      </form>
    </Form>
  );
}
