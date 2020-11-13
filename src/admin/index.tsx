import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Button } from 'antd';
import { History } from "history";
import { EmployeeList } from './employeeList';
import { PerformanceList } from './performanceList';
import './index.css';

interface Props {
  history: History
}

const Admin: React.FC<Props> = (props) => {

  // console.log(props);

  const goBack = () => {
    props.history.push('/');
  }

  const goEmployee = () => {
    props.history.push('/admin/employee')
  }

  const goPerformance = () => {
    props.history.push('/admin/performance');
  }

  return (
    <div>
      <div className="go-back-wrapper">
        <Button onClick={goEmployee}>Employee</Button>
        <Button onClick={goPerformance}>Performance</Button>
      </div>
      <Switch>
        <Route path={`/admin/employee`}>
          <EmployeeList />
        </Route>
        <Route path={`/admin/performance`} exact={true}>
          <PerformanceList />
        </Route>
      </Switch>
      <div className="go-back-wrapper">
        <Button className="go-back" onClick={goBack}>Back Login</Button>
      </div>
    </div>
  )
}

export { Admin };
