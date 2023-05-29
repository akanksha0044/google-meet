import './App.css';
import React, { useEffect, useState } from "react";
import Header from './component/header/Header';
import Main from './component/main/Main';
import Login from './component/login/Login';
//import Signup from './component/signup/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from "./lib/firebase";



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [appState, setAppState] = useState("empty");
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setAppState("home");
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);
  return (
    <div className="App">
      {/* <Header/>
      <Main/> */}
     
      {/* <Signup/> */}
      {/* <Login/> */}
     
      <Router>
      <Switch>
        <Route exact path="/">
          
           <Header/>
             <Main/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        
      </Switch>
    </Router>
      
    </div>
  );
}

export default App;
