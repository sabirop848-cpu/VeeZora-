import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import VideoCard from "@/components/VideoCard";
import mockVideos from "@/data/mockData";

const ExplorePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [sortBy, setSortBy] = useState("relevance");
  const [filterCategory, setFilterCategory] = useState("all");

  return (
    <>
      <Helmet>
        <title>Explore - VidStream</title>
        <meta
          name="description"
          content="Explore and discover amazing videos across all categories on VidStream."
        />
      </Helmet>

      <div className="p-6">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {query ? `Search results for "${query}"` : "Explore Videos"}
          </h1>
        </div>

        {/* Filter and Sort */}
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-400">Filter by:</span>
          </div>

          {/* Category Filter */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 bg-gray-900 border border-gray-700">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border border-gray-700">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 bg-gray-900 border border-gray-700">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border border-gray-700">
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="views">Views</SelectItem>
              <SelectItem value="upload">Upload Date</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExplorePage;