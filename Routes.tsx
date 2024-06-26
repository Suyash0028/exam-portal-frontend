import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import MainApp from './src/Components/MainApp';

const Routes: React.FC = () => {
    return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={MainApp} />
      </Switch>
    </Router>
); 
};

export default Routes;