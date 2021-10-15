import React, { Component } from "react";
import HomePage from "./Pages/HomePage/index";
import Comment from './Pages/Comments/test';
import Informaiton from './Pages/Information/index';
import Detail from './Pages/Detail/Detail';
import Register from './Pages/Register/Register';
import {BrowserRouter, Redirect, Route, Switch } from "react-router-dom";


class App extends  Component {
  render() {
    return(
      <BrowserRouter >
        <Switch>
          <Route exact path="/" component ={HomePage} />
          <Route path="/comment" component ={Comment} />
          <Route exact path ="/inforuser" component = {Informaiton} />
          <Redirect from='/detail/' to='/' exact />
          <Route exact path="/detail/:id" component={Detail}/>
          <Route path="/register" component= {Register}/>
          <Redirect to= "/"/>
        </Switch> 
      </BrowserRouter>
    )
  }
}

export default App;
