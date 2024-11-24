"use client";
import React from "react";
import { useSessionStore } from "./user-session-store";

const ShowUser = () => {
  const name = useSessionStore((state) => state.session?.user?.name);
  return (
    <div>
      <h1 className="text-2xl capitalize  font-bold text-blue-950">
        welcome {name}
      </h1>
    </div>
  );
};

export default ShowUser;
