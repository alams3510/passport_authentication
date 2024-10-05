import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    // Extract user details from the URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
    const image = params.get("image");

    if (name && email) {
      // Store user details in the state
      setUser({ name, email, image });

      // Optionally remove user details from the URL
      // navigate("/dashboard", { replace: true });
    } else {
      // If no user details, redirect to login
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <img src={user.image} alt="image" />
      <h1>{user.name}</h1>
      <h3>{user.email}</h3>
    </div>
  );
};

export default Dashboard;
