import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoCard from '@/components/VideoCard';
import { mockVideos } from '@/data/mockData';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    'All',
    'Trending',
    'Music',
    'Gaming',
    'Education',
    'Entertainment',
    'Sports',
    'News',
  ];

  return (
    <>
      <Helmet>
        <title>Home - VidStream</title>
        <meta
          name="description"
          content="Watch trending videos, discover new creators, and explore categories on VidStream."
        />
      </Helmet>

      <div className="p-6">
        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-gray-800 flex flex-wrap gap-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase()}
                className={`border border-purple-400 rounded-none pb-3 px-4 text-gray-400 hover:text-white transition-colors ${
                  activeTab === category.toLowerCase() ? 'text-white border-b-2 border-purple-400' : ''
                }`}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {mockVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;