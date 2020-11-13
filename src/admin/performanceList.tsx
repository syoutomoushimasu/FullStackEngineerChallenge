import React, { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Select, message, Input, List, Avatar } from 'antd';
import { FETCH_API } from '@/utils/constant';
import './performanceList.css';

const { Option } = Select;

interface Employee {
  id: string;
  name: string;
  email: string;
}

interface Performance {
  id: string;
  title: string;
  employeeId: string;
  reviewers: Review[];
}

interface Review {
  id: string;
  performanceId: string;
  employeeId: string;
}

const PerformanceList: React.FC = () => {
  const [addVisible, setAddVisible] = useState(false)
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [employeeSelected, setEmployeeSelected] = useState<string |undefined>(undefined);
  const [reviewedByList, setReviewedByList] = useState<Employee[]>([]);
  const [reviewedByValue, setReviewedByValue] = useState<string[]>([])
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [performanceList, setPerformanceList] = useState<Performance[]>([]);
  const [editVisible, setEditVisible] = useState(false);
  const [performanceEdit, setPerformanceEdit] = useState<Performance | null>(null);
  const [titleEdit, setTitleEdit] = useState('');

  const addShowModal = () => {
    setAddVisible(true);
  }

  const addOk = () => {
    const data = {
      employeeId: employeeSelected,
      reviewedByArr: reviewedByValue,
      title
    };
    fetch(`${FETCH_API}/performance/create`, {
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
        fetchPerformances();
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

  const getEmployeeNameById = (id: string) => {
    const result = employeeList.filter(item => {
      return String(item.id) === String(id);
    });
    return result[0].name;
  }

  const getReviewerName = (reviewers: Review[]) => {
    const result = reviewers.map(r => {
      const emp = employeeList.filter(item => item.id == r.employeeId)
      return emp[0].name;
    })
    return result.join(', ');
  }

  const editShowModal = (item: Performance) => {
    setPerformanceEdit(item);
    setTitleEdit(item.title);
    setEditVisible(true);
  }

  const viewShowModal = (item: Performance) => {
    //
  }

  const editOk = () => {
    if (!performanceEdit) {
      message.error('Please input title.');
      return;
    }
    fetch(`${FETCH_API}/performance/update`, {
        body: JSON.stringify({
          title: titleEdit,
          performanceId: performanceEdit.id
        }),
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
          fetchPerformances();
        } else {
          message.error('edit failed.');
        }
        setEditVisible(false);
      });
  }

  const editCancel = () => {
    setEditVisible(false);
    setPerformanceEdit(null);
  }

  const editTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleEdit(e.target.value);
  }

  const fetchEmployees = () => {
    fetch(`${FETCH_API}/employee/list`, {
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

  const fetchPerformances = () => {
    fetch(`${FETCH_API}/performance/list`, {
      method: 'get',
      mode: 'cors'
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        setPerformanceList(res);
      });
  }

  useEffect(() => {
    fetchEmployees();
    fetchPerformances();
  }, []);

  return (
    <div className="performance-list">
      <List
        dataSource={performanceList}
        style={{width: '600px'}}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => editShowModal(item)}>Edit</Button>,
              <Button onClick={() => viewShowModal(item)}>View</Button>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={`【${getEmployeeNameById(item.employeeId)}】${item.title}`}
              description={`Reviewed by: ${getReviewerName(item.reviewers)}`}
            />
          </List.Item>
        )}
      />
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
      <Modal
        title="Edit Employee"
        visible={editVisible}
        onOk={editOk}
        onCancel={editCancel}
        destroyOnClose={true}
      >
        <Row>
          <Col span={4}>
            <div className="label">Title: </div>
          </Col>
          <Col span={12}>
            <Input placeholder="Performance title"  value={titleEdit}  onChange={editTitleChange} />
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export { PerformanceList };
