import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomNavbar from './components/CustomNavbar';
import About from './components/pages/About';
import Export from './components/pages/Export';


function App() {
  return (
    <Router>      
      <CustomNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/export" component={Export} />
      </Switch>      
    </Router>    
  );
}

export default App;
