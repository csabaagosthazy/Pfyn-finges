import React from "react";
import { useAuth } from "../context/Auth2";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const { currentUser, isAdmin } = useAuth();
  let history = useHistory();

  React.useEffect(() => {
    console.log("Home");
    if (currentUser) {
      if (isAdmin) {
        console.log("Admin");
      } else {
        console.log("User");
      }
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Hello</h2>
    </div>
  );
};

export default HomePage;
