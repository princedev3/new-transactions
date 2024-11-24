"use client";
import { useSessionStore } from "./user-session-store";
import { Session } from "next-auth";
import { useEffect } from "react";

type SessionProviderProps = {
  children: React.ReactNode;
  session?: Session | null;
};

export const SessionProvider = ({
  children,
  session = null,
}: SessionProviderProps) => {
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    setSession(session);
  }, [setSession, session]);

  return <div>{children}</div>;
};
