import React, { useState } from "react";
import "./forms.css";
import useSocket from "use-socket.io-client";

export default function Login() {
  const [socket] = useSocket("https://enigmatic-mountain-64865.herokuapp.com/");
  socket.connect();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMesaage] = useState("");

  const login = async () => {
    const result = await fetch(
      "https://enigmatic-mountain-64865.herokuapp.com/api/users/login",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result.status !== 200) {
      setStatusMesaage(result.statusText);
    } else {
      socket.emit("add-person");
      window.location.reload(false);
    }
  };

  return (
    <div className="SignupForm">
      <div className="form">
        <h1 className="form-title">Login</h1>
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
          autoComplete="off"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          autoComplete="off"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="form-submit" onClick={() => login()}>
          Login
        </button>
        <div className="error-message">{statusMessage}</div>
      </div>
    </div>
  );
}
