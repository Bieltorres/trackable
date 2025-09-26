"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error captured in /dashboard:", error);
  }, [error]);

  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded">
      <h2 className="text-red-800 font-bold mb-2">Ops, algo deu errado!</h2>
      <p className="text-red-600">{error.message}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Tentar novamente
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Recarregar página
        </button>
      </div>
    </div>
  );
}
