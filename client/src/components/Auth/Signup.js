import React, { useState } from "react";
import "./forms.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const result = await fetch(
      "https://enigmatic-mountain-64865.herokuapp.com/api/users/signup",
      {
        method: "post",
        body: JSON.stringify({
          username,
          firstname,
          lastname,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result);
  };

  return (
    <div className="signup">
      <div className="SignupForm">
        <div className="form">
          <h1 className="form-title">Join today</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            autoComplete="off"
            name="firstname"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            autoComplete="off"
            name="lastname"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
          <label htmlFor="emailSignup">Email address</label>
          <input
            type="text"
            id="emailSignup"
            autoComplete="off"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="signup-password"
            autoComplete="off"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="form-submit" onClick={() => signup()}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
