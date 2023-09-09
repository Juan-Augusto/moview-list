import React, { useEffect } from "react";

export const Auth = () => {
  const cognitoParse =
    "https://moview.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=6581mmighq62rp3ce3kuc5uj5k&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth";

  useEffect(() => {
    window.location.href = cognitoParse;
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-t-blue-600"></div>
        <p className="text-center mt-4">
          Você será redirecionado para o seu login
        </p>
      </div>
    </div>
  );
};
