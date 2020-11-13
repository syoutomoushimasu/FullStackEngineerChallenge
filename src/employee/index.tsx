import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { EmployeeView } from "./employeeView";

const EmployeeIndex: React.FC = () => {
  return (
    <div className="employee-index">
      <Switch>
        <Route 
          path="/employee/:id"
          render={routeProps => (
            <EmployeeView {...routeProps} />
          )}
        >
        </Route>
      </Switch>
    </div>
  )
}

export { EmployeeIndex };
