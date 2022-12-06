import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  /*
  // useEffect without second argument - This function runs after every component render cycle. Not before it and not during it, AFTER. Including the first time this component was mounted
  // This behavior changes after we add dependencies - now this function only executes for the first time this component was mounted and rendered but not thereafter, not for any subsequent rerender cycle
  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, [enteredPassword]);

  // useEffect here to handle side effects, lister to every keystroke and save that entered data and we then wanna trigger another action in response to that. Checking and updating that form validity. in reponse to a keystroke in the email or password field, that is also something you could call a side effect. Is a side effect of the user entering data
  useEffect(() => {
    // Time for checking validity using the setTimeout()
    // use this "identifier" to clear this timer with the built-in clearTimeout function
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    // cleanup function tun cleanup process before useEffect executes this function the next time. It does not run before the very first side-effect execution, it runs before every new side effect function execution
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]); // add dependencies. what we using in your side effect function (useEffect())
  // This tells React that after every login component function execution it will rerun this useEffect function but only if either  or enteredEmail or enteredPassword. If neither of two changed, this effect function will NOT rerun.
*/
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // Here we updating some state the Form validity based on two other states
    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      enteredEmail.includes("@") && event.target.value.trim().length > 6
    );

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
