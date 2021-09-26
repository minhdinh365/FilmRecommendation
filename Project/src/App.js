import React, { Component } from "react";
import HomePage from "./Pages/HomePage/index";
import Comment from './Pages/Comments/test';
import Informaiton from './Pages/Information/index';
import Detail from './Pages/Detail/Detail';
import Register from './Pages/Register/Register';
import {BrowserRouter, Route, Switch } from "react-router-dom";


class App extends  Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/comment">
            <Comment/>
          </Route>
          <Route  path ="/inforuser">
            <Informaiton/>
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch> 
      </BrowserRouter>
    )
  }
}

export default App;
