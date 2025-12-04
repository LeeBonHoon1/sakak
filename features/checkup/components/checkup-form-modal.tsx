"use client";

import { useRef, useState } from "react";
import CheckupForm from "@/features/checkup/components/checkup-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckupFormActions } from "@/features/checkup/components/checkup-form-actions";
import { CheckupFormProvider } from "@/features/checkup/components/checkup-form-provider";

const CheckupFormModal = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4">건강검진 조회하기</Button>
      </DialogTrigger>
      <DialogContent className="w-[900px] h-[600px] flex flex-col p-0">
        <CheckupFormProvider onClose={() => setOpen(false)}>
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle>건강검진 조회</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <CheckupForm formRef={formRef} />
          </div>
          <div className="px-6 py-4">
            <CheckupFormActions formRef={formRef} />
          </div>
        </CheckupFormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CheckupFormModal;
