import React from 'react';
import { Tabs } from 'antd';
import { EmployeeList } from './employeeList';
import { PerformanceList } from './performanceList';

const { TabPane } = Tabs;

interface Props {
  history: {
    push: (url: string) => void;
  }
}

const Admin: React.FC<Props> = () => {

  const onTabChange = (selectedkey: string) => {
    if (selectedkey === '1') {
      console.log('selectedKey 1')
    } else if (selectedkey === '2') {
      console.log('selectedKey 2')
    }
  }

  return (
    <Tabs defaultActiveKey="1" onChange={onTabChange} centered>
      <TabPane tab="Employee" key="1">
        <EmployeeList/>
      </TabPane>
      <TabPane tab="PerformanceReview" key="2">
        <PerformanceList />
      </TabPane>
    </Tabs>
  )
}

export { Admin };
