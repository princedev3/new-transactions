import { CheckCircle } from "lucide-react";

type Props = {
  message?: string;
};

export const FormSuccess = ({ message }: Props) => {
  if (!message) return;

  return (
    <div className="bg-emerald-500/15 dark:bg-transparent border-green-700 dark:border p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
