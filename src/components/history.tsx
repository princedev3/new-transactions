import React, { Suspense } from "react";
import HistoryChildren from "./history-children";
import { auth } from "@/auth";

import { findHistory } from "@/actions/find-history";
import { Transaction } from "@prisma/client";

const History = async () => {
  const session = await auth();

  const allTransactions: { history: Transaction[]; error: string } =
    await findHistory(session?.user?.id as string);

  if (allTransactions.history.length === 0) {
    return null;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1 className="text-xl font-medium capitalize text-blue-950 mb-3">
          history
        </h1>
        <div className="grid gap-y-6">
          {allTransactions?.history.map((item) => (
            <HistoryChildren key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default History;
