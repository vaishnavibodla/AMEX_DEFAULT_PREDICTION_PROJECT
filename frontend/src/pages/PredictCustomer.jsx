import React, { useState } from 'react';
import { Row, Col, Typography, message } from 'antd';
import PredictionForm from '../components/PredictionForm';
import ResultCard from '../components/ResultCard';
import { predictCustomer } from '../services/api';

const { Title } = Typography;

const PredictCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = async (values) => {
    setLoading(true);
    setResult(null); // Clear previous result
    try {
      // Simulate slight delay for professional feel if local
      await new Promise(resolve => setTimeout(resolve, 800));
      const response = await predictCustomer(values);
      setResult(response);
      message.success('Prediction generated successfully!');
    } catch (error) {
      message.error('Failed to generate prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Predict Default Risk</Title>
        <Typography.Text type="secondary">Input customer financial attributes to calculate default probability.</Typography.Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <PredictionForm onSubmit={handlePredict} loading={loading} />
        </Col>
        
        <Col xs={24} lg={8}>
          {result ? (
             <ResultCard result={result} />
          ) : (
            <div style={{ 
              height: '100%', 
              minHeight: '300px', 
              background: '#1a1a1a', 
              borderRadius: '12px', 
              border: '1px dashed #444', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center'
            }}>
              <Typography.Text type="secondary">
                Submit the form to see the prediction results here.
              </Typography.Text>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PredictCustomer;
