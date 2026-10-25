import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import Scheduler from './pages/Scheduler';
import Analytics from './pages/Analytics';
import Monetization from './pages/Monetization';
import Login from './pages/Login';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* App Routes */}
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="generator" element={<Generator />} />
            <Route path="scheduler" element={<Scheduler />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="monetization" element={<Monetization />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
