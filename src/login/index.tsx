import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import { History } from "history";
import { FETCH_API } from '@/utils/constant';
import './index.css';

interface Employee {
  id: string;
  name: string;
  email: string;
}

interface Props {
  history: History
}

// todo: get employee list
const Login:React.FC<Props> = (props) => {
  const [admin, setAdmin] = useState<Employee[]>([
    {
      id: '',
      name: 'admin',
      email: 'admin@paypay.com'
    }
  ]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const list = admin.concat(employees)

  const gotoHome = (item: Employee) => {
    if (item.name === 'admin') {
      props.history.push('/admin/employee')
    } else {
      props.history.push(`/employee/${item.id}`);
    }
  }

  const fetchEmployees = () => {
    fetch(`${FETCH_API}/employee/list`, {
      method: 'get',
      mode: 'cors'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      setEmployees(res);
    });
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="login-wrapper">
      <h1>Login As</h1>
      <div className="list-wrapper">
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item onClick={() => gotoHome(item)}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                }
                title={item.name}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export { Login };