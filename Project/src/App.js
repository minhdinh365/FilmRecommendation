import React, { Component } from "react";
import HomePage from "./Pages/HomePage";
import Informaiton from "./Pages/Information";
import Detail from "./Pages/Detail";
import Register from "./Pages/Register";
import Acctivities from "./Pages/Acctivities";
import Search from "./Pages/Search";
import {
  HashRouter,
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/inforuser" component={Informaiton} />
          <Redirect from="/detail/" to="/" exact />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/search/:name" component={Search} />
          <Route path="/register" component={Register} />
          <Route path="/activities" component={Acctivities} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
