import React, { useState, useEffect } from 'react';
import { Table, Tag, Typography, Card, Input, Button, Modal, Descriptions, Progress, Alert, List, Row, Col } from 'antd';
import { SearchOutlined, DownloadOutlined, RiseOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { getPredictionHistory } from '../services/api';

const { Title, Text } = Typography;

const mockFeatureImportance = [
  { name: 'Credit Utilization', importance: 0.35 },
  { name: 'Payment History', importance: 0.25 },
  { name: 'Balance', importance: 0.20 },
  { name: 'Income', importance: 0.12 },
  { name: 'Transactions', importance: 0.08 },
];

const PredictionHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const history = await getPredictionHistory();
      setData(history);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <span style={{ fontFamily: 'monospace' }}>{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Default Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (prob) => `${(prob * 100).toFixed(1)}%`,
      sorter: (a, b) => a.probability - b.probability,
    },
    {
      title: 'Risk Level',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (risk) => {
        const color = risk === 'High Risk' ? 'volcano' : 'green';
        return (
          <Tag color={color} key={risk}>
            {risk.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'High Risk', value: 'High Risk' },
        { text: 'Low Risk', value: 'Low Risk' },
      ],
      onFilter: (value, record) => record.riskLevel.indexOf(value) === 0,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <a onClick={() => handleViewDetails(record)}>View Details</a>
      ),
    },
  ];

  const filteredData = data.filter(item => 
    item.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const topRiskFactors = [
    "Credit Utilization",
    "Payment History",
    "Balance"
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#141414', border: '1px solid #333', padding: '8px', borderRadius: '4px' }}>
          <p style={{ margin: 0, color: '#fff' }}>{`${payload[0].payload.name}: ${(payload[0].value * 100).toFixed(0)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Prediction History</Title>
          <Typography.Text type="secondary">Review past customer risk assessments</Typography.Text>
        </div>
        <Button type="primary" icon={<DownloadOutlined />}>
          Export CSV
        </Button>
      </div>

      <Card bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Input 
            placeholder="Search by Customer ID" 
            prefix={<SearchOutlined style={{ color: '#888' }} />} 
            style={{ width: 300 }}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
        
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowClassName={() => 'table-row'}
        />
      </Card>

      <Modal
        title={<Title level={4} style={{ margin: 0 }}>Customer Risk Analysis</Title>}
        open={isModalVisible}
        onCancel={closeModal}
        width={800}
        footer={[
          <Button key="close" type="primary" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        {selectedRecord && (() => {
          const isHighRisk = selectedRecord.probability > 0.5;
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
              {/* Customer Info */}
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="Customer ID">
                  <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{selectedRecord.id}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Prediction Date">{selectedRecord.date}</Descriptions.Item>
              </Descriptions>

              {/* Recommendation Alert */}
              <Alert
                message={isHighRisk ? "High Risk Warning" : "Low Risk Profile"}
                description={isHighRisk 
                  ? "This customer has a high probability of default. Consider monitoring account activity or reducing credit exposure." 
                  : "This customer currently shows a low default risk profile."}
                type={isHighRisk ? "error" : "success"}
                showIcon
                style={{ 
                  background: isHighRisk ? '#ff4d4f20' : '#52c41a20', 
                  border: `1px solid ${isHighRisk ? '#ff4d4f40' : '#52c41a40'}` 
                }}
              />

              <Row gutter={[24, 24]}>
                {/* Gauge and Factors */}
                <Col xs={24} md={10}>
                  <Card bordered={false} style={{ background: '#141414', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Title level={5} style={{ textAlign: 'center', marginBottom: '16px' }}>Default Risk Score</Title>
                    <Progress 
                      type="dashboard" 
                      percent={Math.round(selectedRecord.probability * 100)} 
                      status={isHighRisk ? "exception" : "success"}
                      strokeColor={isHighRisk ? '#ff4d4f' : '#52c41a'}
                      trailColor="#333"
                      size={140}
                    />
                    
                    <div style={{ width: '100%', marginTop: '24px' }}>
                      <Text strong style={{ display: 'block', marginBottom: '8px' }}>Top Risk Factors:</Text>
                      <List
                        size="small"
                        dataSource={topRiskFactors}
                        renderItem={item => (
                          <List.Item style={{ borderBottom: 'none', padding: '4px 0' }}>
                            <Typography.Text><RiseOutlined style={{ color: '#ff4d4f', marginRight: '8px' }}/> {item}</Typography.Text>
                          </List.Item>
                        )}
                      />
                    </div>
                  </Card>
                </Col>

                {/* Mini Chart */}
                <Col xs={24} md={14}>
                  <Card title="Prediction Drivers" bordered={false} style={{ background: '#141414', height: '100%' }} headStyle={{ borderBottom: '1px solid #333' }}>
                    <div style={{ height: 220, width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={mockFeatureImportance}
                          layout="vertical"
                          margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                        >
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" stroke="#888" width={110} tick={{ fontSize: 12 }} />
                          <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#222' }} />
                          <Bar dataKey="importance" fill="#1677ff" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          );
        })()}
      </Modal>

      <style jsx="true">{`
        .ant-table {
          background: #1f1f1f;
        }
        .ant-table-thead > tr > th {
          background: #141414;
          color: #fff;
          border-bottom: 1px solid #333;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #333;
        }
        .ant-table-tbody > tr.ant-table-row:hover > td {
          background: #2a2a2a !important;
        }
        .ant-modal-content {
          background-color: #1f1f1f !important;
        }
        .ant-modal-header {
          background-color: #1f1f1f !important;
          border-bottom: 1px solid #333;
        }
        .ant-modal-title {
          color: #fff !important;
        }
        .ant-descriptions-item-label {
          background-color: #141414 !important;
          color: rgba(255, 255, 255, 0.85) !important;
          border-color: #333 !important;
        }
        .ant-descriptions-item-content {
          border-color: #333 !important;
        }
        .ant-descriptions-bordered .ant-descriptions-view {
          border: 1px solid #333 !important;
        }
      `}</style>
    </div>
  );
};

export default PredictionHistory;
