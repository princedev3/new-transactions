"use client";
import CreateNewPasswordForm from "@/components/CreateNewPasswordForm";
import React, { Suspense } from "react";

const CreateNewPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPasswordForm />
    </Suspense>
  );
};

export default CreateNewPassword;
