import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Flag, Eye, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import VideoCard from '@/components/VideoCard';
import { mockVideos, relatedMockVideos } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const VideoPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [newComment, setNewComment] = useState('');

  const relatedVideos = relatedMockVideos.filter(v => v.id !== parseInt(id)).slice(0, 8);

  const fetchVideoAndComments = async () => {
    setLoading(true);

    const { data: videoData, error: videoError } = await supabase
      .from('videos')
      .select('*, user:user_id(raw_user_meta_data)')
      .eq('id', id)
      .single();

    if (videoError || !videoData) {
      toast({ variant: 'destructive', title: 'Error fetching video' });
      console.error(videoError);
      setLoading(false);
      return;
    }
    setVideo(videoData);

    const { data: commentData, error: commentError } = await supabase
      .from('comments')
      .select('*, user:user_id(raw_user_meta_data)')
      .eq('video_id', id)
      .order('created_at', { ascending: false });

    if (commentError) {
      toast({ variant: 'destructive', title: 'Error fetching comments' });
    } else {
      setComments(commentData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideoAndComments();
  }, [id, toast]);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
    toast({ title: liked ? "Like removed" : "Video liked!" });
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSubscribe = () => {
    setSubscribed(!subscribed);
    toast({ title: subscribed ? "Unsubscribed" : "Subscribed successfully!" });
  };

  const handleShare = () => {
    toast({ title: "🚧 This feature isn't implemented yet - but don't worry! You can request it in your next prompt!" });
  };

  const handleReport = () => {
    toast({ title: "🚧 This feature isn't implemented yet - but don't worry! You can request it in your next prompt!" });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) {
      if (!user) toast({ variant: "destructive", title: "Please sign in to comment" });
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          content: newComment,
          video_id: id,
          user_id: user.id
        }
      ])
      .select('*, user:user_id(raw_user_meta_data)')
      .single();

    if (error) {
      toast({ variant: "destructive", title: "Error posting comment" });
    } else {
      setComments([data, ...comments]);
      setNewComment('');
      toast({ title: "Comment posted!" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Video not found</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{video.title} - VidStream</title>
        <meta name="description" content={video.description} />
      </Helmet>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="aspect-video bg-black rounded-xl overflow-hidden">
              <img 
                src={video.thumbnail_url || "https://images.unsplash.com/photo-1694878981885-7647ba10d957"} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4">
              <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 group">
                    <Avatar className="h-10 w-10 group-hover:ring-2 group-hover:ring-purple-300 transition-all">
                      <AvatarImage src={video.user?.raw_user_meta_data?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${video.user_id}`} />
                      <AvatarFallback>{video.user?.raw_user_meta_data?.username?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold group-hover:text-purple-400 transition-colors">
                        {video.user?.raw_user_meta_data?.username || 'Unknown Creator'}
                      </p>
                      <p className="text-sm text-gray-400">{video.views} views</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSubscribe}
                    className={`${subscribed ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                  >
                    {subscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={handleLike}
                    className={`flex items-center gap-2 ${liked ? 'text-purple-400' : ''}`}
                  >
                    <ThumbsUp className="h-5 w-5" />
                    <span>{video.likes}</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    onClick={handleDislike}
                    className={`flex items-center gap-2 ${disliked ? 'text-purple-400' : ''}`}
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="hover:bg-gray-700 rounded-full" 
                    onClick={handleShare}
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="hover:bg-gray-700 rounded-full" 
                    onClick={handleReport}
                  >
                    <Flag className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(video.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-300">{video.description}</p>
              </div>

              <div className="bg-gray-900 rounded-xl p-4">
                <h3 className="text-xl font-bold mb-4">
                  Comments ({comments.length})
                </h3>

                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={user?.raw_user_meta_data?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
                      <AvatarFallback>{user?.raw_user_meta_data?.username?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="bg-gray-800 border-gray-700 rounded-none focus:border-purple-500 resize-none flex-1"
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button 
                      type="submit" 
                      size="sm" 
                      disabled={!newComment.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Comment
                    </Button>
                  </div>
                </form>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={comment.user?.raw_user_meta_data?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}`} />
                        <AvatarFallback>{comment.user?.raw_user_meta_data?.username?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">
                            {comment.user?.raw_user_meta_data?.username || 'Anonymous'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{comment.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2 hover:bg-transparent">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2 hover:bg-transparent">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-gray-400 hover:bg-transparent hover:text-white">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((video) => (
                <Link key={video.id} to={`/video/${video.id}`} className="flex gap-2 group">
                  <div className="w-40 aspect-video bg-gray-400 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-purple-400 transition-colors mb-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-1">{video.channelName}</p>
                    <p className="text-xs text-gray-500">{video.views} views</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;