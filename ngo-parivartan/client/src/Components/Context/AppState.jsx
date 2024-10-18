import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const [userData, setUserData] = useState({
    userId: null,
    email: null,
    isAdmin: false,
    isVolunteer: false
  });

  return (
    <AppContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
