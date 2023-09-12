// NotFound.tsx
import React from "react";

export const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">
          404 - Página não encontrada
        </h1>
        <p className="text-gray-600">
          A página que você está procurando não existe.
        </p>
      </div>
    </div>
  );
};
