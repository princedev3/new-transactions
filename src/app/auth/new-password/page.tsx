import NewVerificationForm from "@/components/new-password-verification";
import React, { Suspense } from "react";
export const dynamic = "force-dynamic";
const NewPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewPasswordPage;
