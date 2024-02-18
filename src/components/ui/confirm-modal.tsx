import React from "react";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "./credenza";
import { Button } from "./button";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  const handlerConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Are you absolutely sure?</CredenzaTitle>
          <CredenzaDescription className="text-left">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaFooter>
          <CredenzaClose className="w-full">
            <Button
              variant={"outline"}
              className="w-full"
            >
              Cancel
            </Button>
          </CredenzaClose>

          <Button className="w-full" onClick={handlerConfirm}>
            Confirm
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default ConfirmModal;
