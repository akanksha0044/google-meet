import './App.css';
import React, { useEffect, useState, createContext, useContext } from "react";
import Header from './component/header/Header';
import Main from './component/main/Main';
import Login from './component/login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from "./lib/firebase";
import VideoChat from './VideoChat';
const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
}

function App({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [appState, setAppState] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const value = { currentUser, appState, connecting, setConnecting };
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
      <AppContext.Provider value={value}>
        <div className="App">
          <AppContext.Provider value={value}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Header />
                  <Main />
                </Route>
                <Route path="/videochat">
                  <VideoChat />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch>
            </Router>
          </AppContext.Provider>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
