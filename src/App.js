import Profile from "./component/Profile";
import Menu from "./component/Menu"
import Covid from "./component/Covid";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import 'react-router-dom';
import {BrowserRouter, Route} from "react-router-dom";
function App() {
  return (
    <>
        <BrowserRouter>
            <Menu/>
            <Route exact path={"/"}><Profile/></Route>
            <Route exact path={"/covid"}><Covid/></Route>
        </BrowserRouter>
    </>
  );
}

export default App;
