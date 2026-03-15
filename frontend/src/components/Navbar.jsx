import React from 'react';
import { Layout, Typography, Space, Avatar } from 'antd';
import { UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#141414', padding: '0 24px', borderBottom: '1px solid #333' }}>
      <Space>
        <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#1677ff' }} />
        <Title level={4} style={{ margin: 0, color: '#fff' }}>
          AMEX Default Prediction
        </Title>
      </Space>
      <Space size="large">
        <Typography.Text style={{ color: 'rgba(255,255,255,0.65)' }}>System Admin</Typography.Text>
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1677ff' }} />
      </Space>
    </Header>
  );
};

export default Navbar;
