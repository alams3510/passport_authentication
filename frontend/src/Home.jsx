import React from "react";

const Home = () => {
  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}`, "_self");
  };
  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Home;
