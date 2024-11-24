"use client";
import { Transaction } from "@prisma/client";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { useSessionStore } from "./user-session-store";
import { deleteTransaction } from "@/actions/delete-transaction";
import toast from "react-hot-toast";

const HistoryChildren = ({ item }: { item: Transaction }) => {
  const userId = useSessionStore((state) => state.session?.user?.id);
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const id = formdata.get("id") as string;
    const userId = formdata.get("userId") as string;
    const response = await deleteTransaction(id, userId);
    if (response.success) {
      toast.success(response.success);
    }
    if (response.error) {
      toast.success(response.error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && userId !== item.userId) {
      return;
    }
  }, []);
  return (
    <div
      key={item.id}
      className={`${
        item.type === "income"
          ? "border-r-4 border-green-500"
          : "border-r-4 border-red-500"
      } flex items-center rounded-md justify-between p-3  shadow-md  relative text-blue-950 group`}
    >
      <div className="">
        <div className="flex flex-col">
          <p className="capitalize mr-2">{item.title}</p>
          <p className=" text-[13px] ">
            {format(new Date(item.createdAt), "yyyy-MM-dd")}
          </p>
        </div>
        <form
          onSubmit={handleDelete}
          className="hidden font-medium absolute -top-3 shadow-md rounded-full w-fit z-50   -right-1 -left-1    text-2xl group-hover:block text-red-500  "
        >
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="userId" value={userId || ""} />
          <button
            type="submit"
            className="w-6 h-6  flex bg-white items-center justify-center rounded-full "
          >
            <X />
          </button>
        </form>
      </div>
      <p className="">
        {item.type === "income" ? "" : "- "}${item.amount}
      </p>
    </div>
  );
};

export default HistoryChildren;
