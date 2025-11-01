import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import UploadPage from '@/pages/UploadPage';
import ChannelPage from '@/pages/ChannelPage';
import SubscriptionsPage from '@/pages/SubscriptionsPage';
import SettingsPage from '@/pages/SettingsPage';
import AboutPage from '@/pages/AboutPage';
import VideoPage from '@/pages/VideoPage';
import AdminDashboard from '@/pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/channel/:id" element={<ChannelPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;