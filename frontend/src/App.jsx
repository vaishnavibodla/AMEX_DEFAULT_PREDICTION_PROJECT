import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PredictCustomer from './pages/PredictCustomer';
import PredictionHistory from './pages/PredictionHistory';
import BulkPrediction from './pages/BulkPrediction';
import FeatureImportance from './pages/FeatureImportance';

const { Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#000' }}>
      <Sidebar />
      <Layout style={{ background: '#0a0a0a' }}>
        <Navbar />
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#141414', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predict" element={<PredictCustomer />} />
            <Route path="/history" element={<PredictionHistory />} />
            <Route path="/bulk" element={<BulkPrediction />} />
            <Route path="/insights" element={<FeatureImportance />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
