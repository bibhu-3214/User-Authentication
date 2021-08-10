import React from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import NotesContainer from "./My Notes/NotesContainer";

const NavBar = (props) => {
  const { isLoggedIn, handleAuth } = props;
  return (
    <div>
      <h1 className="display-3 mb-3 text-center">User Authentication</h1>
      <ul className="nav nav-pills nav-fill mb-3">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="nav-item">
              <Link to="/account" className="nav-link">
                Account
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mynotes" className="nav-link">
                My Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to=""
                className="nav-link"
                onClick={() => {
                  localStorage.removeItem("token");
                  alert("succesfully logged out");
                  handleAuth();
                  props.history.push("/");
                }}
              >
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Login" className="nav-link">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>

      <Switch>
        <Route path="/mynotes" component={NotesContainer} />
        <Route path="/account" component={Account} />
        <Route
          path="/login"
          render={(props) => {
            return <Login {...props} handleAuth={handleAuth} />;
          }}
        />
        <Route path="/register" component={Register} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default withRouter(NavBar);
