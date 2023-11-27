import React, { useState } from 'react';
import { Form, Input, Button, Upload, Col, Row, Select, Radio, Switch, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { DropdownIconTop, DropdownIconDown } from '../../utils/icons';
import axios from 'axios';
const { Option } = Select;

const UserForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [userType, setUserType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [Progress, setProgress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = async (values) => {
    if (!imageUrl) {
      message.error('Please upload an image before submitting the form.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const existingUserData = JSON.parse(sessionStorage.getItem('userData')) || [];
      const newUserData = [...existingUserData, { ...values, imageUrl: imageUrl }];

      sessionStorage.setItem('userData', JSON.stringify(newUserData));
      form.resetFields(); // Reset form fields
      setSwitchValue(false);
      setUserType('');
      setImageUrl('');
      setModalVisible(true);
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to submit the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = () => {
    setModalVisible(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    console.log(info, 'inf');
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('file', file);
    fmData.append('upload_preset', 'mycloud');
    fmData.append('cloud_name', 'dqsskvw6k');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dqsskvw6k/image/upload', fmData, config);

      onSuccess('Ok');
      setImageUrl(res.data.url);
    } catch (err) {
      console.log('Error: ', err);
      const error = new Error('Some error');
      onError({ err });
    }
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
    <div>
      <Button
        style={{
          width: '100%',
          minHeight: '31px',
          background: '#E4E4E4',
          borderRadius: '3px',
          color: '#333',
          fontSize: '11px',
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
      layout="vertical"
      style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}
      colon={false}
    >
      <Row style={{ marginBottom: '30px', fontSize: '23px', fontWeight: 400 }}>
        User Form
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12} style={{ marginBottom: '16px' }}>
          <label htmlFor="avatar" style={{ marginBottom: '8px', display: 'block' }}>
            Upload Profile Picture
          </label>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={uploadImage}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  height: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <label htmlFor="avatar" style={{ marginTop: '2px', display: 'block' }}>
           PNG , JPEG , JPG
          </label>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="User name"
            name="username"
            rules={[{ required: true, message: 'Cannot be empty' }]}
            required={false}
          >
            <Input size="large" placeholder="Enter Username" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true,  message: 'Cannot be empty' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input size="large" placeholder="Enter Email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[{ required: true,  message: 'Cannot be empty' }]}
            required={false}
          >
            <Input size="large" placeholder="Enter PhoneNo" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Country"
            name="Country"
            rules={[{ required: true, message: 'Cannot be empty' }]}
          >
            <Select
              size="large"
              onFocus={() => setIsSelectOpen((prev) => !prev)}
              suffixIcon={isSelectOpen ? <DropdownIconDown /> : <DropdownIconTop />}
              placeholder="Select Country"
            >
              <Option value="Pakistan">Pakistan</Option>
              <Option value="India">India</Option>
              <Option value="Turkey">Turkey</Option>
              <Option value="United States">United States</Option>
              <Option value="Italy">Italy</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            required={false}
            label="States"
            name="States"
            rules={[{ required: true, message: 'Cannot be empty' }]}
          >
            <Select
              size="large"
              onFocus={() => setIsSelectOpen((prev) => !prev)}
              suffixIcon={isSelectOpen ? <DropdownIconDown /> : <DropdownIconTop />}
              placeholder="Select States"
            >
              <Option value="Sindh">Sindh</Option>
              <Option value="Mumbai">Mumbai</Option>
              <Option value="Los Angeles">Los Angeles</Option>
              <Option value="Lombardy">Lombardy</Option>
              <Option value="California">California</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Switch checked={switchValue} onChange={handleSwitchChange} />
          <br />
          <br />

          {switchValue && (
            <Radio.Group onChange={handleRadioChange} value={userType} style={{ marginBottom: '10px' }}>
              <Radio value="teacher">Teacher</Radio>
              <Radio value="user">User</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          )}
        </Col>
      </Row>
      <Form.Item
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button htmlType="submit" size="large" loading={loading}>
          ADD USER
        </Button>
      </Form.Item>

      <Modal
        title="Success"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        okText="OK"
      >
        Data successfully entered!
      </Modal>
    </Form>
  );
};

export default UserForm;
