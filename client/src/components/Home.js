import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Notes from "./Notes";

const Home = (props) => {
  const history = useHistory();
  const loggedIn = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    const authenticated = localStorage.getItem("isAuthenticated");
    if (!authenticated) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      {loggedIn ? (
        <div>
          <Notes showAlert={props.showAlert} />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Home;
