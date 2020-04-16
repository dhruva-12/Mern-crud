import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import {
  Signup,
  login,
  CreateProfile,
  Feed,
  mynetwork,
  ChangePassword,
  MyProfile,
  SearchPeople,
  ForgotPass,
  Profile,
  BlockedUsers,
} from "./components";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "./Utils/Common";
import connections from "./components/connections";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <div className="header">
              {!getToken() ? (
                <NavLink activeClassName="active" to="/sign-in">
                  Login
                </NavLink>
              ) : (
                <div>
                  <NavLink activeClassName="active" to="/feed">
                    Dashboard
                  </NavLink>
                  <NavLink activeClassName="active" to="/mynetwork">
                    My Network
                  </NavLink>
                </div>
              )}
            </div>
            <SearchPeople></SearchPeople>
            <div className="auth-inner">
              <Switch>
                <Route path="/sign-in" component={login} />
                <Route path="/forgotpassword" component={ForgotPass} />
                {/* <Route path="/noemail" component={noemail} /> */}
                <Route path="/Signup" component={Signup} />
                <Route path="/create-profile" component={CreateProfile} />
                <Route path="/feed" component={Feed} />
                <Route path="/mynetwork" component={mynetwork} />
                <Route path="/change-password" component={ChangePassword} />
                <Route path="/connections" component={connections} />
                <Route path="/myProfile" component={MyProfile} />
                <Route path="/users/blocked" component={BlockedUsers} />
                <Route
                  path="/profile/:first_name/:user_id"
                  component={Profile}
                />
              </Switch>
            </div>
          </header>
        </Router>
      </div>
    );
  }
}

export default App;
