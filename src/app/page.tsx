import { findHistory } from "@/actions/find-history";
import { auth } from "@/auth";
import AddTransaction from "@/components/add-transaction";
import DisplayUserBalance from "@/components/display-user-balance";
import History from "@/components/history";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@prisma/client";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();

  const allTransactions: { history: Transaction[]; error: string } =
    await findHistory(session?.user?.id as string);

  return (
    <Suspense>
      <div className="grid   ">
        <Card className="mx-auto grid w-full max-w-3xl p-4">
          <CardContent>
            <div
              className={`${
                allTransactions.history.length === 0
                  ? "grid "
                  : "sm:grid-cols-2"
              }  grid  content-start gap-5`}
            >
              <div className="grid gap-y-3 content-start">
                <DisplayUserBalance />
                <AddTransaction />
              </div>
              {allTransactions.history.length === 0 ? null : (
                <div className="grid h-[90vh] overflow-y-auto pr-5 custom-scroll-bar">
                  <History />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
