import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Select, message, Input } from 'antd';
import { FETCH_URL } from '@/utils/constant';
import './performanceList.css';

const { Option } = Select;

interface Employee {
  id: string;
  name: string;
  email: string;
}

const PerformanceList: React.FC = () => {
  const [addVisible, setAddVisible] = useState(false)
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [employeeSelected, setEmployeeSelected] = useState<string |undefined>(undefined);
  const [reviewedByList, setReviewedByList] = useState<Employee[]>([]);
  const [reviewedByValue, setReviewedByValue] = useState<string[]>([])
  const [title, setTitle] = useState<string | undefined>(undefined);

  const addShowModal = () => {
    setAddVisible(true);
  }

  const addOk = () => {
    const data = {
      employeeId: employeeSelected,
      reviewedByArr: reviewedByValue,
      title
    };
    console.log(data)
    fetch(`${FETCH_URL}/api/performance/create`, {
      body: JSON.stringify(data),
      method: 'post',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        if (res.status === 'success') {
          message.success('create success.');
          // fetchEmployees();
        } else {
          message.error('create failed.');
        }
        setAddVisible(false);
      });
  }

  const addCancel = () => {
    setAddVisible(false);
  }

  const addTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const reviewedChange = (value: string) => {
    setEmployeeSelected(value);
    const list = getReviewedByList(value);
    setReviewedByList(list);
    setReviewedByValue([])
  }

  const reviewedByChange = (value: string[]) => {
    setReviewedByValue(value);
  }

  const getReviewedByList = (value: string) => {
    return employeeList.filter(item => {
      return String(item.id) !== String(value)
    });
  }

  const fetchEmployees = () => {
    fetch(`${FETCH_URL}/api/employee/list`, {
      method: 'get',
      mode: 'cors'
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        setEmployeeList(res);
      });
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="performance-list">
      <div className="new-performance-wrapper">
        <Button
          type="primary"
          block
          className="new-performance"
          onClick={addShowModal}
        >
          Add New Performance Review
        </Button>
      </div>
      <Modal
        title="Add New Performance Review"
        visible={addVisible}
        onOk={addOk}
        onCancel={addCancel}
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <div className="label">Title: </div>
          </Col>
          <Col span={24}>
            <Input placeholder="title" onChange={addTitleChange} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="label">Reviewed Employee: </div>
          </Col>
          <Col span={24}>
            <Select
              style={{width: '100%'}} 
              onChange={reviewedChange}
            >
              {
                employeeList.map(item => {
                  return (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <div className="label">Reviewed By: </div>
          </Col>
          <Col span={24}>
            <Select
              style={{ width: '100%' }}
              mode="multiple"
              allowClear
              onChange={reviewedByChange}
              value={reviewedByValue}
            >
              {
                reviewedByList.map(item => {
                  return (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  )
                })
              }
            </Select>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export { PerformanceList };
