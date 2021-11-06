import React, { Component } from "react";
import HomePage from "./Pages/HomePage";
import Informaiton from "./Pages/Information";
import Detail from "./Pages/Detail";
import Register from "./Pages/Register";
import Acctivities from "./Pages/Acctivities";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/inforuser" component={Informaiton} />
          <Redirect from="/detail/" to="/" exact />
          <Route exact path="/detail/:id" component={Detail} />
          <Route path="/register" component={Register} />
          <Route path="/activities" component={Acctivities} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
