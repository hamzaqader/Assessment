// MySidebar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { CiMenuBurger } from "react-icons/ci";
import { MdOutlineFormatListBulleted } from "react-icons/md";

const { Sider, Content } = Layout;

const MySidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1000);
  const [switchValue, setSwitchValue] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1000);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSwitchChange = (checked) => {
    setSwitchValue(checked);

    if (!checked) {
      setUserType("");
    }
  };

  const handleRadioChange = (e) => {
    setUserType(e.target.value);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: "white",
          boxShadow: "2px 0 6px rgba(0, 21, 41, 0.35)",
          overflow: "auto",
        }}
      >
        <div style={{ height: "32px", margin: "16px" }}>
          {React.createElement(
            collapsed ? CiMenuBurger : CiMenuBurger,
            {
              className: "trigger",
              onClick: toggleSidebar,
            }
          )}
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<MdOutlineFormatListBulleted size={"15px"} />}>
            <Link to="/userForm">User Form</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<MdOutlineFormatListBulleted size={"15px"} />}>
            <Link to="/usertable">User Table</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            height: 280,
            overflowY: "hidden",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MySidebar;
