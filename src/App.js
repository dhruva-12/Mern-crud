import React, { Component } from "react";
import "./App.css";
import "./static/main.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import {
  Signup,
  login,
  Create,
  Feed,
  Requests,
  ChangePassword,
  MyProfile,
  ForgotPass,
  Profile,
  BlockedUsers,
  PostSignup,
  ProfileType,
  Footer,
  Connections,
} from "./components";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import main from "./components/main";
import Layout from "./components/Layout";
import Nav from "./components/Nav";

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            {/* <div className="header">
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
            </div> */}
            {/* <SearchPeople></SearchPeople> */}

            <Switch>
              <Route exact path="/" component={main} />
              <Route path="/signin" component={login} />
              <Route path="/forgotpassword" component={ForgotPass} />
              {/* <Route path="/noemail" component={noemail} /> */}
              <Route path="/Signup" component={Signup} />
              <Route path="/create-profile" component={Create} />
              <Route path="/feed" component={Layout} />
              <Route path="/mynetwork/connections" component={Connections} />
              <Route path="/mynetwork" component={Requests} />
              <Route path="/change-password" component={ChangePassword} />
              <Route path="/myProfile" component={MyProfile} />
              <Route path="/users/blocked" component={BlockedUsers} />
              <Route path="/profile/:first_name/:user_id" component={Profile} />
              <Route path="/email-confirmed" component={PostSignup} />
              <Route path="/profile-type" component={ProfileType} />
              {/* <Route path="/Layout" component={Layout} /> */}
              <Route path="/Nav" component={Nav} />
            </Switch>
          </header>
        </Router>
      </div>
    );
  }
}

export default App;
