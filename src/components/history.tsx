import React, { Suspense } from "react";
import HistoryChildren from "./history-children";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";

const History = async () => {
  const session = await auth();

  const history = await prisma.transaction.findMany({
    where: {
      userId: session?.user?.id || "",
    },
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1 className="text-xl font-medium capitalize text-blue-950 mb-3">
          history
        </h1>
        <div className="grid gap-y-6">
          {history.map((item) => (
            <HistoryChildren key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default History;
