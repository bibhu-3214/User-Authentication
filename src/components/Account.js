import axios from "axios";
import React, { useEffect, useState } from "react";

const Account = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://dct-user-auth.herokuapp.com/users/account", {
        headers: {
          "x-auth": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        const result = resp.data;
        setUser(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div className="container text-center">
      <h2 className="display-5">User Account</h2>
      <h2>
        Username
        <blockquote className="blockquote">{user.username}</blockquote>
      </h2>
      <h2>
        Email
        <blockquote className="blockquote">{user.email}</blockquote>
      </h2>
    </div>
  );
};

export default Account;
