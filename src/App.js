import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // this function executed AFTER!!! every component re-evaluation, but only if the dependencies will changed
    // This code will run once after app starts up (because I didn't set the dependencies)
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    // When the page is reloaded, the data is retrieved from the localStorage
    if (storedUserLoggedInInformation === "1") {
      // update the state
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // use localStrage for saving data after reload. "setItem()" - this method saves data with custom id(name)
    // second argument is signal user actions. "1" - user isLoggedIn; "0" - not logged in (all this custom)
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
