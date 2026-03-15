import React, { useState, useEffect } from 'react';
import { Card, Typography, Spin, Alert } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getFeatureImportance } from '../services/api';

const { Title, Text } = Typography;

const FeatureImportance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const response = await getFeatureImportance();
        if (response && response.features) {
          // Sort by importance descending
          const sortedData = response.features.sort((a, b) => b.importance - a.importance);
          setData(sortedData);
        }
      } catch (err) {
        setError('Failed to load feature importance data.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#141414', border: '1px solid #333', padding: '12px', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#fff' }}>{`${label}`}</p>
          <p style={{ margin: 0, color: '#1677ff' }}>
            {`Importance: ${(payload[0].value * 100).toFixed(1)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Model Feature Importance</Title>
        <Text type="secondary">Discover which customer attributes drive the risk assessment model.</Text>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '48px 0' }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon style={{ background: '#ff4d4f20', border: '1px solid #ff4d4f40' }}/>
      ) : (
        <Card bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px', minHeight: '500px' }}>
          <div style={{ height: 400, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#888" tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                <YAxis dataKey="name" type="category" stroke="#888" width={150} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="importance" 
                  fill="#1677ff" 
                  radius={[0, 4, 4, 0]}
                  barSize={32}
                  animationDuration={1500} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FeatureImportance;
