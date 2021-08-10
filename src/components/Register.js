import React, { useState } from "react";
import axios from "axios";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { username: username, email: email, password: password };
    axios
      .post("http://dct-user-auth.herokuapp.com/users/register", formData)
      .then((resp) => {
        const result = resp.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.message);
        } else {
          alert("successfully created user");
          props.history.push("/login");
        }
      })
      .catch((err) => {
        alert(err);
      });
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container text-center">
      <h1 className="display-5">Register</h1>
      <form className="row g-3 justify-content-center" onSubmit={handleSubmit}>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            name="username"
            value={username}
            placeholder="enter your name"
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            placeholder="enter your email"
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-10">
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            placeholder="enter your password"
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-10">
          <input className="btn btn-primary mb-3" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
