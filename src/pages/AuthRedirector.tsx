import React, { useState } from "react";
import { getCognitoToken } from "../services/moview-api";
export const AuthRedirector = () => {
  const code = window.location.href.split("code=")[1];
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ backgroundColor: "#111" }}
    >
      <div className="flex flex-col justify-center items-center shadow-md rounded-md p-4 bg-white font-bold">
        <h1>Clique para fazer login</h1>
        <button
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ease-in-out duration-300"
          onClick={async () => {
            setLoading(true);
            await getCognitoToken(code);
            setLoading(false);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
