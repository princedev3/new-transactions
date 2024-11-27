"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { DotLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerificationAction } from "@/actions/new-verification-action";
import { Button } from "./ui/button";
import Link from "next/link";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [succes, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const onClick = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerificationAction(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onClick();
  }, [onClick]);

  return (
    <Suspense fallback={<DotLoader color="#1E3A8A" />}>
      <Card className="w-full max-w-3xl grid mx-auto">
        <CardContent>
          <div className="w-full  grid gap-y-7">
            <h1 className="text-center text-2xl text-blue-950 font-bold capitalize">
              Checking your email
            </h1>
            <div className="text-center flex items-center justify-center">
              {!error && !succes && <DotLoader color="#1E3A8A" />}
            </div>
            <FormError message={error} />
            <FormSuccess message={succes} />
            {succes && (
              <Button className="bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4">
                <Link href={"/auth/create-password?token=" + token}>
                  create password
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default NewVerificationForm;
