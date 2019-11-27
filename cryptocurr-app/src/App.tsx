import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ListPage />
        </Route>
        <Route path="/details/:id">
          <DetailsPage />
        </Route>
      </Switch>
    </Router>
  );
}
