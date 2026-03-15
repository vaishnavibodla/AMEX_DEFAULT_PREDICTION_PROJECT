import React from 'react';
import { Card, Typography, Progress, Statistic, Row, Col, Tag } from 'antd';
import { WarningOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { probability, riskLevel, id } = result;
  
  const isHighRisk = probability > 0.5;
  const strokeColor = isHighRisk ? '#ff4d4f' : '#52c41a';
  const icon = isHighRisk ? <WarningOutlined /> : <SafetyOutlined />;

  return (
    <Card 
      bordered={false} 
      style={{ 
        background: 'linear-gradient(145deg, #1f1f1f 0%, #141414 100%)', 
        borderRadius: '12px', 
        border: `1px solid ${isHighRisk ? '#ff4d4f40' : '#52c41a40'}`,
        boxShadow: `0 8px 32px ${isHighRisk ? 'rgba(255, 77, 79, 0.15)' : 'rgba(82, 196, 26, 0.15)'}`,
        height: '100%'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Title level={3} style={{ margin: 0, color: strokeColor }}>
          Prediction Result
        </Title>
        <Text type="secondary">ID: <Tag color="blue" style={{ marginTop: 8 }}>{id || 'N/A'}</Tag></Text>
      </div>

      <Row align="middle" justify="center" gutter={[32, 32]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Progress 
            type="dashboard" 
            percent={Math.round(probability * 100)} 
            strokeColor={strokeColor}
            status={isHighRisk ? "exception" : "success"}
            trailColor="#333"
            size={180}
            format={(percent) => (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>{percent}%</span>
                <span style={{ fontSize: '14px', color: '#888' }}>Default Prob.</span>
              </div>
            )}
          />
        </Col>
        
        <Col span={24}>
          <div style={{ background: '#000', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
            <Statistic 
              title="Risk Assessment" 
              value={riskLevel} 
              prefix={icon}
              valueStyle={{ color: strokeColor, fontWeight: 'bold' }} 
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ResultCard;
