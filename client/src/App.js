import React, { Component } from "react";
import NavBar from "./components/layout/Navbar";
import Body from "./components/layout/Body";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import DiscussionRoom from "./components/pages/DiscussionRoom";
import Profile from "./components/pages/Profile";
import { Security, ImplicitCallback } from "@okta/okta-react";
import SecureRoute from "@okta/okta-react/dist/SecureRoute";
import RegistrationFrom from "./components/auth/RegistrationFrom";

const config = {
  issuer: "https://dev-612249.oktapreview.com/oauth2/default",
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: "0oaiwik3abIBUoTca0h7"
};

function onAuthRequired({ history }) {
  history.push("/login");
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer={config.issuer}
          client_id={config.client_id}
          redirect_uri={config.redirect_uri}
          onAuthRequired={onAuthRequired}
        >
          <div>
            <NavBar />
            <Route exact path="/" component={Body} />
            <Route path="/about" component={About} />
            <Route path="/discussion-room" component={DiscussionRoom} />
            <Route path="/register" component={RegistrationFrom} />
            <Route
              path="/login"
              render={() => (
                <Login baseUrl="https://dev-612249.oktapreview.com" />
              )}
            />
            <SecureRoute path="/profile" exact component={Profile} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
