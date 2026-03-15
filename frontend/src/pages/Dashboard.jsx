import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Spin, Typography, List } from 'antd';
import { UserOutlined, WarningOutlined, SafetyCertificateOutlined, RiseOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as LineTooltip, Legend as LineLegend, CartesianGrid } from 'recharts';
import { getDashboardStats } from '../services/api';

const { Title, Text } = Typography;

const COLORS = ['#ff4d4f', '#52c41a'];

const trendData = [
  { day: "Day 1", highRisk: 20, lowRisk: 80 },
  { day: "Day 2", highRisk: 25, lowRisk: 75 },
  { day: "Day 3", highRisk: 22, lowRisk: 78 },
  { day: "Day 4", highRisk: 30, lowRisk: 70 },
  { day: "Day 5", highRisk: 27, lowRisk: 73 }
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const riskData = stats ? [
    { name: "High Risk", value: stats.highRisk },
    { name: "Low Risk", value: stats.lowRisk }
  ] : [];

  const topRiskFactors = [
    "1. Credit Utilization",
    "2. Payment History",
    "3. Balance"
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Dashboard Analytics</Title>
        <Typography.Text type="secondary">Overview of American Express customer risk profiles.</Typography.Text>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '48px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            <Col xs={24} md={8}>
              <Card bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <Statistic
                  title="Total Customers Analyzed"
                  value={stats?.totalCustomers || 0}
                  prefix={<UserOutlined style={{ color: '#1677ff' }} />}
                  valueStyle={{ fontSize: '36px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px', border: '1px solid #ff4d4f40', boxShadow: '0 6px 16px rgba(255, 77, 79, 0.1)' }}>
                <Statistic
                  title="High Risk Customers"
                  value={stats?.highRisk || 0}
                  prefix={<WarningOutlined />}
                  valueStyle={{ color: '#ff4d4f', fontSize: '36px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px', border: '1px solid #52c41a40', boxShadow: '0 6px 16px rgba(82, 196, 26, 0.1)' }}>
                <Statistic
                  title="Low Risk Customers"
                  value={stats?.lowRisk || 0}
                  prefix={<SafetyCertificateOutlined />}
                  valueStyle={{ color: '#52c41a', fontSize: '36px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            <Col xs={24} md={12}>
              <Card title="Risk Distribution" bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px', height: '100%' }}>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <PieTooltip contentStyle={{ backgroundColor: '#141414', borderColor: '#333' }} />
                      <PieLegend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Top Risk Factors" bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px', height: '100%' }}>
                <List
                  dataSource={topRiskFactors}
                  renderItem={item => (
                    <List.Item>
                      <Typography.Text style={{ fontSize: '16px' }}><RiseOutlined style={{ color: '#ff4d4f', marginRight: '12px' }}/> {item}</Typography.Text>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="Default Risk Trend" bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px' }}>
                <div style={{ height: 300, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="day" stroke="#888" />
                      <YAxis stroke="#888" />
                      <LineTooltip contentStyle={{ backgroundColor: '#141414', borderColor: '#333' }} />
                      <LineLegend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line type="monotone" name="High Risk Customers" dataKey="highRisk" stroke="#ff4d4f" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                      <Line type="monotone" name="Low Risk Customers" dataKey="lowRisk" stroke="#52c41a" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Dashboard;
