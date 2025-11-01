import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Bell, Share, Play, Users, Video, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import VideoCard from '@/components/VideoCard';
import { mockVideos } from '@/data/mockData';
import { supabase } from '@/lib/supabase';

const ChannelPage = () => {
  const { id } = useParams();
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [activeTab, setActiveTab] = useState('videos');
  const [isLoading, setIsLoading] = useState(true);
  const [channelData, setChannelData] = useState(null);
  
  // Fetch channel data
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          const channel = {
            id: parseInt(id),
            name: 'Tech Insights',
            banner: 'Modern tech workspace with multiple monitors and gadgets',
            avatar: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400&h=400&fit=crop&crop=face',
            subscribers: '1.2M',
            videoCount: mockVideos.filter(v => v.channelId === parseInt(id)).length,
            description: 'Welcome to Tech Insights! We create amazing content about technology, programming, artificial intelligence, and the latest trends in the tech industry. Join us on this exciting journey of discovery and innovation.',
            joinDate: 'March 15, 2020',
            location: 'San Francisco, CA',
            website: 'https://techinsights.com',
            socialLinks: {
              twitter: 'https://twitter.com/techinsights',
              github: 'https://github.com/techinsights',
              linkedin: 'https://linkedin.com/company/techinsights'
            },
            totalViews: '45.7M',
            featuredPlaylists: [
              { id: 1, name: 'Web Development Masterclass', videoCount: 24 },
              { id: 2, name: 'AI & Machine Learning', videoCount: 18 },
              { id: 3, name: 'Mobile App Development', videoCount: 15 }
            ]
          };
          setChannelData(channel);
          setSubscriptionCount(1200000);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching channel data:', error);
        setIsLoading(false);
      }
    };

    fetchChannelData();
  }, [id]);

  const handleSubscribe = async () => {
    try {
      setSubscribed(!subscribed);
      setSubscriptionCount(prev => 
        subscribed ? prev - 1 : prev + 1
      );
      
      // Simulate API call to update subscription
      if (subscribed) {
        // Unsubscribe logic
        console.log('Unsubscribed from channel');
      } else {
        // Subscribe logic
        console.log('Subscribed to channel');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      setSubscribed(!subscribed);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: channelData?.name,
        text: `Check out ${channelData?.name} on VidStream`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      console.log('Link copied to clipboard');
    }
  };

  const channelVideos = mockVideos.filter(v => v.channelId === parseInt(id));
  const popularVideos = channelVideos.sort((a, b) => b.views - a.views).slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!channelData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Channel Not Found</h2>
          <p className="text-gray-400">The channel you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{channelData.name} - VidStream</title>
        <meta name="description" content={`${channelData.name} channel on VidStream - ${channelData.description}`} />
        <meta property="og:title" content={`${channelData.name} - VidStream`} />
        <meta property="og:description" content={channelData.description} />
        <meta property="og:image" content={channelData.avatar} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Banner Section */}
        <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
          <img 
            alt={channelData.banner} 
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-4 left-6 md:left-8">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 md:w-20 md:h-20 border-4 border-white/20">
                <AvatarImage src={channelData.avatar} alt={channelData.name} />
                <AvatarFallback className="bg-purple-600 text-white">
                  {channelData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Channel Info Section */}
        <div className="px-4 md:px-6 lg:px-8 py-6 border-b border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="ml-0 md:ml-24">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {channelData.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {subscriptionCount.toLocaleString()} subscribers
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      {channelData.videoCount} videos
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {channelData.totalViews} views
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base max-w-3xl leading-relaxed">
                    {channelData.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleSubscribe}
                  size="lg"
                  className={`${
                    subscribed 
                      ? "bg-gray-700 hover:bg-gray-600 text-white" 
                      : "bg-red-600 hover:bg-red-700 text-white"
                  } font-semibold px-6 py-2 rounded-lg transition-colors duration-200`}
                >
                  {subscribed ? (
                    <>
                      <Bell className="mr-2 h-4 w-4" />
                      Subscribed
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleShare}
                  className="border-gray-600 hover:bg-gray-800 hover:border-gray-500 transition-colors duration-200"
                >
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="px-4 md:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent border-b border-gray-800 rounded-none p-0 h-auto w-full justify-start">
                <TabsTrigger
                  value="videos"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-white rounded-none pb-4 px-6 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Videos
                </TabsTrigger>
                <TabsTrigger
                  value="playlists"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-white rounded-none pb-4 px-6 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Playlists
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-white rounded-none pb-4 px-6 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About
                </TabsTrigger>
              </TabsList>

              {/* Videos Tab Content */}
              <TabsContent value="videos" className="mt-8 space-y-8">
                {/* Popular Videos Section */}
                {popularVideos.length > 0 && (
                  <section>
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-red-600 text-white">
                        Popular
                      </Badge>
                      Most Popular Videos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {popularVideos.map(video => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  </section>
                )}

                {/* All Videos Section */}
                <section>
                  <h3 className="text-xl font-semibold text-white mb-6">All Videos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {channelVideos.map(video => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </section>
              </TabsContent>

              {/* Playlists Tab Content */}
              <TabsContent value="playlists" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {channelData.featuredPlaylists.map(playlist => (
                    <Card key={playlist.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="w-full h-40 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                          <Play className="w-12 h-12 text-white/80" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-lg text-white mb-2">
                          {playlist.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {playlist.videoCount} videos
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* About Tab Content */}
              <TabsContent value="about" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <section>
                      <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {channelData.description}
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold text-white mb-4">Channel Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-gray-300">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span>Joined {channelData.joinDate}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <Users className="w-5 h-5 text-gray-400" />
                          <span>{subscriptionCount.toLocaleString()} subscribers</span>
                        </div>
                        {channelData.location && (
                          <div className="flex items-center gap-3 text-gray-300">
                            <span>📍 {channelData.location}</span>
                          </div>
                        )}
                        {channelData.website && (
                          <div className="flex items-center gap-3 text-gray-300">
                            <span>🌐 {channelData.website}</span>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader>
                        <CardTitle className="text-white">Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Total Views</span>
                          <span className="text-white font-semibold">{channelData.totalViews}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Subscribers</span>
                          <span className="text-white font-semibold">{subscriptionCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Total Videos</span>
                          <span className="text-white font-semibold">{channelData.videoCount}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {channelData.socialLinks && (
                      <Card className="bg-gray-900 border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-white">Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {Object.entries(channelData.socialLinks).map(([platform, url]) => (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200"
                            >
                              <span className="capitalize">{platform}</span>
                            </a>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelPage;