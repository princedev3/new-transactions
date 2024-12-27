import LoginPages from "@/components/auth/login-page";
import React from "react";
export const dynamic = "force-dynamic";
const LoginPage = () => {
  return (
    <div>
      <LoginPages />
    </div>
  );
};

export default LoginPage;

// import { useQuery } from "@tanstack/react-query";

// interface UserQuery {
//   queryKey: string;
//   apiUrl: string;
// }

// export const usefetchSingleChat = async ({ apiUrl, queryKey }: UserQuery) => {
//   const fetchchatbyId = async () => {
//     const res = await fetch(apiUrl);
//     if (!res.ok) {
//       throw new Error("Failed to fetch chat");
//     }
//     return await res.json();
//   };
//   const { data, status, refetch } = useQuery({
//     queryKey: [queryKey],
//     queryFn: fetchchatbyId,
//     retry: false,
//     refetchInterval: false,
//   });

//   return {
//     data,
//     status,
//     refetch,
//   };
// };
