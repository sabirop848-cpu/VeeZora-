import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const VideoCard = ({ video, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/video/${video.id}`}>
        <div className="video-thumbnail relative aspect-video bg-gray-800 rounded-xl overflow-hidden mb-3">
          <img
            src={video.thumbnail || "https://images.unsplash.com/photo-1567443042551-f3e3cc2be870"}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
      </Link>

      <div className="flex gap-3">
        <Link to={`/channel/${video.channelId}`}>
          <Avatar className="h-9 w-9 ring-2 ring-transparent hover:ring-purple-500 transition-all">
            <AvatarImage src={video.channelAvatar} alt={video.channelName} />
            <AvatarFallback>{video.channelName[0]}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <Link to={`/video/${video.id}`}>
            <h3 className="font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors mb-1">
              {video.title}
            </h3>
          </Link>

          <Link
            to={`/channel/${video.channelId}`}
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            {video.channelName}
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{video.views} views</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{video.uploadedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;