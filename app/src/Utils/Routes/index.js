import React from "react";
import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import Upload from "../../components/Home/Upload/Upload";
import View from "../../components/Home/View/View";
import Home from "../../components/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Link to="/">
        <h1>Photos</h1>
      </Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/upload" component={Upload} />
        <Route path="/view" component={View} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
