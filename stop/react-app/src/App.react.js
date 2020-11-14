import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SocketContext from "components/socket/SocketContext.react";
import SocketIOClient from "utils/SocketIOClient";
import * as ROUTES from "constants/routes";
import Home from "components/Home.react";
import Room from "components/Room.react";

import AuthRenderer from "components/auth/AuthRenderer.react";

function App() {
  return (
    <SocketContext.Provider value={new SocketIOClient()}>
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route path={ROUTES.ROOM}>
            <AuthRenderer fallback={<p>Loading...</p>}>
              <Room />
            </AuthRenderer>
          </Route>
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
