import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  RadarChartOutlined,
  HistoryOutlined,
  CloudUploadOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '/predict',
      icon: <RadarChartOutlined />,
      label: <Link to="/predict">Predict Default</Link>,
    },
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label: <Link to="/history">Prediction History</Link>,
    },
    {
      key: '/bulk',
      icon: <CloudUploadOutlined />,
      label: <Link to="/bulk">Bulk Prediction</Link>,
    },
    {
      key: '/insights',
      icon: <BarChartOutlined />,
      label: <Link to="/insights">Model Insights</Link>,
    }
  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      theme="dark"
      width={240}
      style={{
        background: '#141414',
        borderRight: '1px solid #333'
      }}
    >
      <div style={{ height: '64px', margin: '16px' }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
          alt="Amex Logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.9 }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ background: '#141414' }}
      />
    </Sider>
  );
};

export default Sidebar;
