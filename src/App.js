import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomNavbar from './components/CustomNavbar';


function App() {
  return (
    <Router>      
      <CustomNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>      
    </Router>    
  );
}

export default App;
