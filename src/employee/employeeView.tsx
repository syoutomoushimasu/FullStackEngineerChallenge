import React, { useEffect, useState } from "react";
import { History } from "history";
import { List, Input, Avatar, Button, Modal, message } from 'antd';
import { FETCH_API } from '../utils/constant';

const { TextArea } = Input;

interface EmployeeViewPorps {
  history: History,
  match: {
    params: {
      id: string;
    }
  }
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

interface Employee {
  id: string;
  name: string;
  email: string;
}

const EmployeeView: React.FC<EmployeeViewPorps> = (props) => {
  const [performanceList, setPerformanceList] = useState<Performance[]>([])
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [feedback, setFeedback] = useState('');
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [currentPerformance, setCurrentPerformance] = useState<Performance | null>(null);

  const getPerformanceListByEmployeeId = (employeeId: string) => {
    fetch(`${FETCH_API}/performance/list`, {
      body: JSON.stringify({ employeeId }),
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
        setPerformanceList(res);
      });
  }

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  }

  const showFeedbackModal = (item: Performance) => {
    setFeedbackModal(true);
    setCurrentPerformance(item);
  }

  const getReviewerName = (reviewers: Review[]) => {
    const result = reviewers.map(r => {
      const emp = employeeList.filter(item => item.id == r.employeeId)
      return emp[0].name;
    })
    return result.join(', ');
  }

  const onSubmit = () => {
    const { match } = props;
    if (!feedback) {
      message.error('please input feedback.');
      return;
    }
    const data = {
      performanceId: currentPerformance?.id,
      feedback,
      reviewerId: match.params.id
    }
    fetch(`${FETCH_API}/performance/createFeedback`, {
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
          message.success('submit success.');
          getPerformanceListByEmployeeId(match.params.id);
        } else {
          message.error('submit failed.');
        }
        setFeedbackModal(false);
      });
  }

  const onSubmitCancel = () => {
    setFeedbackModal(false);
    setCurrentPerformance(null);
    setFeedback('')
  }

  const getEmployeeNameById = (id: string) => {
    const result = employeeList.filter(item => {
      return String(item.id) === String(id);
    });
    return result[0].name;
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

  useEffect(() => {
    const { match } = props;
    fetchEmployees();
    getPerformanceListByEmployeeId(match.params.id);
  }, []);

  return (
    <div
      className="employee-view"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      <List
        dataSource={performanceList}
        style={{ width: '600px' }}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => showFeedbackModal(item)}>
                Feedback
              </Button>
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
      <Modal
        title="Feedback"
        visible={feedbackModal}
        onOk={onSubmit}
        okText="Submit"
        onCancel={onSubmitCancel}
        destroyOnClose={true}
      >
        <TextArea rows={4} onChange={onTextChange} />
      </Modal>
    </div>
  );
}

export { EmployeeView };
