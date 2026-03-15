import React, { useState } from 'react';
import { Typography, Card, Upload, Table, Button, Tag, message } from 'antd';
import { InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { bulkPredict } from '../services/api';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const BulkPrediction = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('Please select a CSV file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileList[0]);

    setLoading(true);
    try {
      // Small artificial delay to show off loading state
      await new Promise(r => setTimeout(r, 1200));
      const response = await bulkPredict(formData);
      setResults(response);
      message.success(`${response.length} predictions generated successfully!`);
    } catch (error) {
      message.error('Failed to process bulk predictions.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      // Basic validation
      const isCsv = file.type === 'text/csv' || file.name.endsWith('.csv');
      if (!isCsv) {
        message.error('You can only upload CSV files!');
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false; // Prevent default upload behavior
    },
    fileList,
    maxCount: 1,
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <span style={{ fontFamily: 'monospace' }}>{text}</span>,
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
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Bulk Prediction</Title>
        <Text type="secondary">Upload a CSV dataset containing customer information to process multiple predictions at once.</Text>
      </div>

      <Card bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px', marginBottom: '24px' }}>
        <Dragger {...uploadProps} style={{ background: '#141414', borderColor: '#333' }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: '#1677ff' }} />
          </p>
          <p className="ant-upload-text" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Click or drag file to this area to upload</p>
          <p className="ant-upload-hint" style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
          </p>
        </Dragger>

        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <Button 
            type="primary" 
            icon={<CloudUploadOutlined />} 
            onClick={handleUpload} 
            loading={loading}
            disabled={fileList.length === 0}
            size="large"
          >
            Start Processing
          </Button>
        </div>
      </Card>

      {results.length > 0 && (
        <Card title="Prediction Results" bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px' }}>
          <Table 
            columns={columns} 
            dataSource={results.map((r, i) => ({...r, key: r.id || i}))} 
            pagination={{ pageSize: 10 }}
            rowClassName={() => 'table-row'}
          />
        </Card>
      )}

      <style jsx="true">{`
        .ant-table { background: #1f1f1f; }
        .ant-table-thead > tr > th { background: #141414; color: #fff; border-bottom: 1px solid #333; }
        .ant-table-tbody > tr > td { border-bottom: 1px solid #333; }
        .ant-table-tbody > tr.ant-table-row:hover > td { background: #2a2a2a !important; }
        .ant-upload.ant-upload-drag { border-color: #333 !important; }
        .ant-upload.ant-upload-drag:hover { border-color: #1677ff !important; }
      `}</style>
    </div>
  );
};

export default BulkPrediction;
