import React from "react";
import { History } from "history";

interface EmployeeViewPorps {
  history: History
}

const EmployeeView: React.FC<EmployeeViewPorps> = (props) => {

  console.log('EmployeeViewPorps..', props);

  return (
    <div>EmployeeView</div>
  );
}

export { EmployeeView };
