import React from 'react';
import { Form, InputNumber, Select, Button, Row, Col, Typography, Card } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const PredictionForm = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Card bordered={false} style={{ background: '#1f1f1f', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0 }}>
          <LineChartOutlined style={{ marginRight: '8px', color: '#1677ff' }} />
          Customer Financial Profile
        </Title>
        <Text type="secondary">Enter the customer's attributes to predict the probability of default.</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          payment_history: 'good',
          credit_utilization: 30,
        }}
        size="large"
      >
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="balance"
              label="Account Balance ($)"
              rules={[{ required: true, message: 'Please enter balance' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} placeholder="e.g. 5000" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="income"
              label="Estimated Income ($)"
              rules={[{ required: true, message: 'Please enter income' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} placeholder="e.g. 65000" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              name="credit_utilization"
              label="Credit Utilization (%)"
              rules={[{ required: true, message: 'Please enter utilization' }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} max={100} placeholder="e.g. 30" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="payment_history"
              label="Payment History"
              rules={[{ required: true, message: 'Please select history' }]}
            >
              <Select placeholder="Select history type">
                <Option value="excellent">Excellent (No late payments)</Option>
                <Option value="good">Good (1-2 late payments)</Option>
                <Option value="fair">Fair (3-5 late payments)</Option>
                <Option value="poor">Poor (5+ late payments)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: '16px', marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" loading={loading} block style={{ height: '48px', fontSize: '16px', borderRadius: '8px' }}>
            Generate Prediction
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PredictionForm;
