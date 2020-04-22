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
  mynetwork,
  ChangePassword,
  MyProfile,
  ForgotPass,
  Profile,
  BlockedUsers,
  PostSignup,
  ProfileType,
  Footer,
} from "./components";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { getToken } from "./Utils/Common";
import connections from "./components/connections";
import main from "./components/main";

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
              <Route path="/feed" component={Feed} />
              <Route path="/mynetwork" component={mynetwork} />
              <Route path="/change-password" component={ChangePassword} />
              <Route path="/connections" component={connections} />
              <Route path="/myProfile" component={MyProfile} />
              <Route path="/users/blocked" component={BlockedUsers} />
              <Route path="/profile/:first_name/:user_id" component={Profile} />
              <Route path="/email-confirmed" component={PostSignup} />
              <Route path="/profile-type" component={ProfileType} />
            </Switch>

            <Footer></Footer>
          </header>
        </Router>
      </div>
    );
  }
}

export default App;
