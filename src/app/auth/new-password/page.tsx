import NewVerificationForm from "@/components/new-password-verification";
import React, { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewPasswordPage;
