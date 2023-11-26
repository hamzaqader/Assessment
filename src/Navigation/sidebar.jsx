// MySidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TableOutlined,
  InfoCircleOutlined,
  
} from '@ant-design/icons';
import { Switch,Radio} from 'antd';

const { Sider, Content } = Layout;

const MySidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [userType, setUserType] = useState('');

  const handleSwitchChange = (checked) => {
    setSwitchValue(checked);
   
    if (!checked) {
      setUserType('');
    }
  };

  const handleRadioChange = (e) => {
    setUserType(e.target.value);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: 'white',
          boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
          overflow: 'auto',
        }}
      >
        <div style={{ height: '32px', margin: '16px' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggleSidebar,
          })}
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          
         
          <Menu.Item key="1" icon={<TableOutlined />}>
            <Link to="/">User Form</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            <Link to="/usertable">User Table</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        ></Content>
      </Layout>
    </Layout>
  );
};

export default MySidebar;
