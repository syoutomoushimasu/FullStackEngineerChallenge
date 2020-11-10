import React from 'react';
import { 
  BrowserRouter as Router,
  Switch, 
  Route 
} from "react-router-dom";
import { Login } from './login';
import { Admin } from './admin';

const App: React.FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route 
          path="/admin"
          render={routeProps => (
            <Admin {...routeProps} />
          )}
        />
        <Route 
          path="/"
          exact={true}
          render={routeProps => (
            <Login {...routeProps} />
          )}
       />
      </Switch>
    </Router>
  );
}

export default App; 
