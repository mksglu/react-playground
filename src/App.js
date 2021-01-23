import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Highlight from "./components/highlight";
import Selector from "./components/selector";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Highlight</Link>
            </li>
            <li>
              <Link to="/selector">Selector</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/selector">
            <Selector />
          </Route>
          <Route path="/">
            <Highlight />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
