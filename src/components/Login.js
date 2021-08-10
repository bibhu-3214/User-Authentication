import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    axios
      .post("http://dct-user-auth.herokuapp.com/users/login", formData)
      .then((resp) => {
        const result = resp.data;
        if (result.hasOwnProperty("errors")) {
          alert(result.errors);
        } else {
          alert("Login Successful");
          localStorage.setItem("token", result.token);
          props.history.push("/");
          props.handleAuth();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="container text-center">
      <h2 className="display-5">Login</h2>
      <form className="row g-3 justify-content-center" onSubmit={handleSubmit}>
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

export default Login;
