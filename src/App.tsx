import React from 'react';
import { 
  BrowserRouter as Router,
  Switch, 
  Route 
} from "react-router-dom";
import { Login } from './login';
import { Admin } from './admin';
import { EmployeeIndex } from './employee';

const App: React.FC<{}> = () => {
  return (
    <Router>
      <Switch>
        <Route 
          path="/"
          exact={true}
          render={routeProps => (
            <Login {...routeProps} />
          )}
        />
        <Route 
          path="/admin"
          render={routeProps => (
            <Admin {...routeProps} />
          )}
        />
        <Route 
          path="/employee"
          render={routeProps => (
            <EmployeeIndex {...routeProps} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App; 
