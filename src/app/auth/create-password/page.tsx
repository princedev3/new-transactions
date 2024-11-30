import CreateNewPasswordForm from "@/components/CreateNewPasswordForm";
import React, { Suspense } from "react";
export const dynamic = "force-dynamic";
const CreateNewPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPasswordForm />
    </Suspense>
  );
};

export default CreateNewPassword;
