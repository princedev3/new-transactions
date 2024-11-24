import NewNerificationForm from "@/components/auth/new-verification-form";
import React, { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewNerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
