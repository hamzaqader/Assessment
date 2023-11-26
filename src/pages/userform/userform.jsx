import React, { useState } from 'react';
import { Form, Input, Button, Upload, Col, Row, Select, Radio, Switch, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DropdownIconTop, DropdownIconDown } from '../../utils/icons';
import './useForm.css'
const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UserForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [userType, setUserType] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
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

  const uploadButton = (
    <div >
      <Button
        style={{
          width: '100%',
          minHeight: '31px',
          background: '#E4E4E4',
          borderRadius: '3px',
          color: '#333',
          fontSize: '11px'
        }}
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        Browse
      </Button>
    </div>
  );

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
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}

          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="User name"
            name="username"
            rules={[{ required: true, message: 'Cannot be empty' }]}
          >
            <Input size='large' />
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
            <Input size='large' />
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
            <Input size='large' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Preferred Timings"
            name="timings"
            rules={[{ required: true, message: 'Cannot be empty' }]}
          >
            <Select
              size='large'
              onFocus={() => setIsSelectOpen((prev) => !prev)}
              suffixIcon={isSelectOpen ? <DropdownIconDown /> : <DropdownIconTop />}
              placeholder="Select Timing">
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

          {!switchValue && (
            <Radio.Group onChange={handleRadioChange} value={userType} style={{ marginBottom: '10px' }}>
              <Radio value="teacher">Teacher</Radio>
              <Radio value="user">User</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          )}
        </Col>
      </Row>
      <Form.Item style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Button htmlType="submit" size='large'>
          ADD USER
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
