import React, { useState } from 'react';
import { Form, Input, Button, Upload, Col, Row, Select, Radio, Switch } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const UserForm = () => {
  const [form] = Form.useForm();
  const [switchValue, setSwitchValue] = useState(false);
  const [userType, setUserType] = useState('');

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleSwitchChange = (checked) => {
    setSwitchValue(checked);
    if (!checked) {
      setUserType('');
    }
  };

  const handleRadioChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <Form
      form={form}
      name="userForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            style={{ width: '159px', height: '73px', border: '1px dashed black' }}
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<PlusOutlined />}>Browse</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="User name"
            name="username"
            rules={[{ required: true, message: 'Cannot be empty' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Cannot be empty' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[{ required: true, message: 'Cannot be empty' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Preferred Timings"
            name="timings"
            rules={[{ required: true, message: 'Cannot be empty' }]}
          >
            <Select style={{ width: '100%' }} placeholder="Select Timing">
              <Option value="morning">Morning</Option>
              <Option value="evening">Evening</Option>
              <Option value="night">Night</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Switch checked={switchValue} onChange={handleSwitchChange} />
          <br />
          <br />

          {switchValue && (
            <Radio.Group onChange={handleRadioChange} value={userType}>
              <Radio value="teacher">Teacher</Radio>
              <Radio value="user">User</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          )}
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
