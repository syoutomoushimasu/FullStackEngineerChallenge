import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Row, Col, message } from 'antd';
import { FETCH_URL } from '@/utils/constant';
import './index.css';

interface Props {
  history: {
    push: (url: string) => void;
  }
}

const Admin: React.FC<Props> = (props) => {
  const [addVisible, setAddVisible] = useState(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const addShowModal = () => {
    setAddVisible(true);
  }

  const addOk = () => {
    if (!name || !email) {
      message.error('Please input name and email.');
      return;
    }
    // console.log({ name, email })
    fetch(`${FETCH_URL}/api/employee/create`, {
        body: JSON.stringify({ name, email }),
        method: 'POST',
        mode: 'cors',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        message.success('create success.');
        setAddVisible(false);
      });
  }

  const addCancel = () => {
    setAddVisible(false);
    setName(undefined);
    setEmail(undefined);
  }

  const addNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const addEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return (
    <div className="admin-wrapper">
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
    </div>
  );
}

export { Admin };