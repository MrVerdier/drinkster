import React, { useState } from "react";
import useSocket from "use-socket.io-client";

export default function Logout({ user }) {
  // let history = useHistory();
  const [status, setStatus] = useState("");
  const [socket] = useSocket("https://enigmatic-mountain-64865.herokuapp.com/");

  const logout = async () => {
    const result = await fetch(
      `https://enigmatic-mountain-64865.herokuapp.com/api/destroysession`
    );
    const body = await result.json();

    setStatus(body.status);
    socket.emit("remove-person", user);
    document.location.reload(true);
  };

  console.log(status);

  return (
    <div className="logout">
      <h1>Are you sure?</h1>
      <button onClick={() => logout()} className="logout-button">
        Yes log me out
      </button>
    </div>
  );
}
