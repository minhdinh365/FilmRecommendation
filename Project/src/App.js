import React, { Component } from "react";
import HomePage from "./Pages/HomePage/index";
import Comment from './Pages/Comments/test';
import Informaiton from './Pages/Information/index';
import {BrowserRouter, Route, Switch } from "react-router-dom";


class App extends  Component {
  updateComment = () =>{
  }
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
        </Switch> 
      </BrowserRouter>
    )
  }
}

export default App;
