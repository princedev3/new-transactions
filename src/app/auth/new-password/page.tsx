import NewVerificationForm from "@/components/new-password-verification";
import React, { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <NewVerificationForm />
    // <Suspense fallback={<div>Loading...</div>}>
    // </Suspense>
  );
};

export default NewPasswordPage;
