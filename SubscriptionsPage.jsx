import React from 'react';
import { Helmet } from 'react-helmet';
import VideoCard from '@/components/VideoCard';
import { mockVideos } from '@/data/mockData';

const SubscriptionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Subscriptions - VidStream</title>
        <meta name="description" content="Watch latest videos from channels you're subscribed to on VidStream." />
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Latest from Subscriptions
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVideos.slice(0, 12).map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SubscriptionsPage;