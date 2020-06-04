import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Upload from "../../components/Home/Upload";
import View from "../../components/Home/View";
import Home from "../../components/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/upload" component={Upload} />
        <Route path="/view" component={View} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
