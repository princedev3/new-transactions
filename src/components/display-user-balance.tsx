import React, { Suspense } from "react";
import ShowUser from "./show-user";
import { getBalance } from "@/actions/get-balance";
import { FormSuccess } from "./form-success";

const DisplayUserBalance = async () => {
  const balance = await getBalance();
  if (balance.error) {
    <FormSuccess message={balance.error} />;
    return;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className=" grid gap-y-4 content-start">
        <ShowUser />
        <div className="grid gap-y-2">
          <p className="text-lg font-bold text-blue-950 ">your balance</p>
          <span className="text-lg font-bold text-blue-950">
            $
            {new Intl.NumberFormat("en-US").format(
              Number(balance.remainingIncome)
            )}
          </span>
        </div>

        <div className="shadow-md p-4 rounded-sm grid grid-cols-2 bg-white ">
          <div className="place-self-center">
            <h1 className="text-xl font-bold text-blue-950 uppercase">
              income
            </h1>
            <span className="text-green-700 font-semibold text-lg text-center">
              ${" "}
              {new Intl.NumberFormat("en-US").format(
                Number(balance.totalIncome)
              )}
            </span>
          </div>
          <div className="place-self-center">
            <h1 className="text-xl  font-bold text-blue-950 uppercase">
              expense
            </h1>
            <span className="text-red-700 font-semibold text-lg text-center">
              ${" "}
              {new Intl.NumberFormat("en-US").format(
                Number(balance.totalExpense)
              )}
            </span>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default DisplayUserBalance;
