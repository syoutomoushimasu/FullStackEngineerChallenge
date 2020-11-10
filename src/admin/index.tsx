import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Row, Col } from 'antd';
import './index.css';

interface Props {
  history: {
    push: (url: string) => void;
  }
}

const Admin: React.FC<Props> = (props) => {
  const [addVisible, setAddVisible] = useState(false);

  const addShowModal = () => {
    setAddVisible(true);
  }

  const addOk = () => {
    // add
  }

  const addCancel = () => {
    setAddVisible(false);
  }

  const addNameChange = (e: any) => {
    console.log(e)
  }

  const addEmailChange = () => {

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