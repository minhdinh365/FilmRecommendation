import React, { Component } from "react";
import HomePage from "./Pages/HomePage/index";
import Register from "./Pages/Register/Register";
import Detail from "./Pages/Detail/Detail";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exc path="/detail" component={Detail} />
            <Route path="/Register" component={Register} />
            <Route path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
