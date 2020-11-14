import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Button } from 'antd';
import { History } from "history";
import { EmployeeView } from "./employeeView";

interface Props {
  history: History
}

const EmployeeIndex: React.FC<Props> = props => {
  const goBack = () => {
    props.history.push('/');
  }
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
      <div className="go-back-wrapper">
        <Button className="go-back" onClick={goBack}>Back Login</Button>
      </div>
    </div>
  )
}

export { EmployeeIndex };
