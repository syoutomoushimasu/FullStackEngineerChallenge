import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Row, Col, message, List, Avatar } from 'antd';
import { FETCH_URL } from '@/utils/constant';
import './employeeList.css';

interface Employee {
  id: string;
  name: string;
  email: string;
}

const EmployeeList: React.FC = () => {
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [nameEdit, setNameEdit] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [emailEdit, setEmailEdit] = useState<string | undefined>(undefined);
  const [list, setList] = useState<Employee[]>([]);

  const addShowModal = () => {
    setAddVisible(true);
  }

  const editShowModal = (item: Employee) => {
    setEditVisible(true);
    setNameEdit(item.name);
    setEmailEdit(item.email);
  }

  const addOk = () => {
    if (!name || !email) {
      message.error('Please input name and email.');
      return;
    }
    fetch(`${FETCH_URL}/api/employee/create`, {
        body: JSON.stringify({ name, email }),
        method: 'post',
        mode: 'cors',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        if (res.status === 'success') {
          message.success('create success.');
          fetchEmployees();
        } else {
          message.error('create failed.');
        }
        setAddVisible(false);
      });
  }

  const editOk = () => {
    if (!nameEdit || !emailEdit) {
      message.error('Please input name and email.');
      return;
    }
    fetch(`${FETCH_URL}/api/employee/edit`, {
        body: JSON.stringify({ name: nameEdit, email: emailEdit }),
        method: 'post',
        mode: 'cors',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        if (res.status === 'success') {
          message.success('edit success.');
          fetchEmployees();
        } else {
          message.error('edit failed.');
        }
        setEditVisible(false);
      });
  }

  const addCancel = () => {
    setAddVisible(false);
    setName(undefined);
    setEmail(undefined);
  }

  const editCancel = () => {
    setEditVisible(false);
    setNameEdit(undefined);
    setEmailEdit(undefined);
  }

  const addNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const editNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameEdit(e.target.value);
  }

  const addEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const editEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailEdit(e.target.value);
  }

  const onDelete = (item: Employee) => {
    fetch(`${FETCH_URL}/api/employee/delete`, {
      body: JSON.stringify({ name: item.name }),
      method: 'post',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        if (res.status === 'success') {
          message.success('delete success.');
          fetchEmployees();
        } else {
          message.error('delete failed.');
        }
      });
  }

  const fetchEmployees = () => {
    fetch(`${FETCH_URL}/api/employee/list`, {
      method: 'get',
      mode: 'cors'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(res) {
      setList(res);
    });
  }

  useEffect(() => {
    console.log('employee list..')
    fetchEmployees();
  }, [])

  return (
    <div className="admin-wrapper">
      <List
        dataSource={list}
        style={{width: '600px'}}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => editShowModal(item)}>Edit</Button>,
              <Button danger onClick={() => onDelete(item)}>Delete</Button>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={item.name}
              description={item.email}
            />
          </List.Item>
        )}
      />
      <div className="admin">
        <Button 
          type="primary" 
          block 
          className="new-employee"
          onClick={addShowModal}
        >
          Add New Employee
        </Button>
      </div>
      <Modal
        title="Add New Employee"
        visible={addVisible}
        onOk={addOk}
        onCancel={addCancel}
        destroyOnClose={true}
      >
        <Row>
          <Col span={4}>
            <div className="label">Name: </div>
          </Col>
          <Col span={12}>
            <Input placeholder="employee name" onChange={addNameChange} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={4}>
            <div className="label">Email: </div>
          </Col>
          <Col span={12}>
            <Input placeholder="employee email"  onChange={addEmailChange} />
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Edit Employee"
        visible={editVisible}
        onOk={editOk}
        onCancel={editCancel}
        destroyOnClose={true}
      >
        <Row>
          <Col span={4}>
            <div className="label">Name: </div>
          </Col>
          <Col span={12}>
            {/* <Input placeholder="employee name" value={nameEdit} onChange={editNameChange} /> */}
            <div>{nameEdit}</div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={4}>
            <div className="label">Email: </div>
          </Col>
          <Col span={12}>
            <Input placeholder="employee email"  value={emailEdit}  onChange={editEmailChange} />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export { EmployeeList };
