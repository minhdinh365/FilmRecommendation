import React, { Component } from "react";
import HomePage from "./Pages/HomePage";
import Informaiton from "./Pages/Information";
import Detail from "./Pages/Detail";
import Register from "./Pages/Register";
import Acctivities from "./Pages/Acctivities";
import Search from "./Pages/Search";
import Cookies from 'js-cookie';
import axios from "axios";
import Upgrade from "./Pages/UpgradeUser";
import jwt_decode from 'jwt-decode';
import {
  HashRouter,
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

class App extends Component {
  render() {

    (function() {
      var token = Cookies.get('User');
      if (token) {
          axios.defaults.headers.common['Authorization'] = token;
      } else {
          axios.defaults.headers.common['Authorization'] = null;
      }
    })();

    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/inforuser" component={Informaiton} />
          <Redirect from="/detail/" to="/" exact />
          <Route exact path="/detail/:id" component={Detail} />
          <Route exact path="/search/:name" component={Search} />
          <Route path="/upgrade_user" component={Upgrade} />
          <Route path="/register" component={Register} />
          <Route path="/activities" component={Acctivities} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
