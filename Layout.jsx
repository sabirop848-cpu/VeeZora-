import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Helmet>
        <title>VidStream - Watch, Share, and Inspire the World</title>
        <meta name="description" content="Join VidStream to watch, upload, and share videos" />
      </Helmet>
      <div className="min-h-screen bg-black">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex pt-16">
          <Sidebar isOpen={sidebarOpen} />
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;