import React from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertCircle className="w-8 h-8 text-red-400" />
      <span className="mt-3 text-red-500 text-sm text-center max-w-md">{message}</span>
    </div>
  );
}