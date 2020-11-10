import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import './index.css';
import { Link } from 'react-router-dom';

const admin = [
  {
    name: 'admin',
    email: 'admin@paypay.com'
  }
]

const employees = [
  {
    name: 'employee1',
    email: 'employee1@paypay.com'
  },
  {
    name: 'employee2',
    email: 'employee2@paypay.com'
  }
];

interface Props {
  history: {
    push: (url: string) => void;
  }
}

interface Item {
  name: string;
  email: string;
}

// todo: get employee list
const Login:React.FC<Props> = (props) => {
  const list = admin.concat(employees)

  const gotoHome = (item: Item) => {
    console.log(item.name);
    if (item.name === 'admin') {
      props.history.push('/admin')
    } else {
      props.history.push('/employees');
    }
  }

  useEffect(() => {
    // console.log(props);
  });

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
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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