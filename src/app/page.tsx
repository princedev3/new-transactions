import AddTransaction from "@/components/add-transaction";
import DisplayUserBalance from "@/components/display-user-balance";
import History from "@/components/history";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Suspense>
      <div className="grid place-items-center min-h-screen ">
        <Card className="mx-auto grid w-full max-w-3xl p-4">
          <CardContent>
            <div className="grid  sm:grid-cols-2 content-start gap-5">
              <div className="grid gap-y-3 content-start">
                <DisplayUserBalance />
                <AddTransaction />
              </div>
              <div className="grid h-[90vh] overflow-y-scroll pr-5 custom-scroll-bar">
                <History />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
