"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { DotLoader } from "react-spinners";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { Button } from "../ui/button";
import Link from "next/link";

const NewNerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [succes, setSuccess] = useState<string | undefined>();
  const [verified, setVerified] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const router = useRouter();
  const onClick = useCallback(() => {
    if (!token) {
      setError("Missing token");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data?.success) {
          setVerified(true);
          router.push("/auth/login");
        }
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
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid  ">
        <Card className="grid max-w-xl mx-auto w-full gap-4">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-blue-950">
              Verification your email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full flex items-center justify-center">
              {!error && !succes && (
                <DotLoader className=" text-3xl" color="#051d42" size={30} />
              )}
              <FormError message={error} />
              <FormSuccess message={succes} />
            </div>
          </CardContent>
          <CardFooter>
            {verified && (
              <Button
                type="button"
                disabled={!verified}
                className="w-full cursor-pointer disabled:cursor-not-allowed"
              >
                <Link href={"/auth/login"}> Click here to login</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  );
};

export default NewNerificationForm;
