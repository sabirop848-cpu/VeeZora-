import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const UploadPage = () => {
  const { toast } = useToast();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Video uploaded!",
      description: "Your video is being processed and will be live soon.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Upload Video - VidStream</title>
        <meta
          name="description"
          content="Upload and share your videos with the world on VidStream."
        />
      </Helmet>

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Upload Video
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Video */}
          <div className="bg-gray-900 rounded-xl p-6 border-2 border-dashed border-gray-700 hover:border-purple-500 transition-colors">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Upload a Video</h3>
              <p className="text-sm text-gray-400 mb-4">
                Drag and drop video files or click below to upload
              </p>

              <Label htmlFor="video-upload">
                <Button
                  type="button"
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <span>Select File</span>
                </Button>
                <Input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
              </Label>

              {videoFile && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-400">
                  <span>Video selected: {videoFile.name}</span>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setVideoFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter video title"
              className="bg-gray-900 border-gray-700"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell viewers about your video"
              className="bg-gray-900 border-gray-700 min-h-32"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="bg-gray-900 border-gray-700">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Visibility */}
          <div>
            <Label htmlFor="visibility">Visibility</Label>
            <Select defaultValue="public">
              <SelectTrigger className="bg-gray-900 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="unlisted">Unlisted</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="e.g. tutorial, gaming, music"
              className="bg-gray-900 border-gray-700"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <Label htmlFor="thumbnail-upload">Thumbnail</Label>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <Input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
              />
              <Label
                htmlFor="thumbnail-upload"
                className="flex items-center gap-3 cursor-pointer"
              >
                {thumbnailFile ? (
                  <span className="text-sm text-green-400">
                    Uploaded: {thumbnailFile.name}
                  </span>
                ) : (
                  <>
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                    <p className="text-sm font-medium">Upload thumbnail</p>
                  </>
                )}
              </Label>
              <p className="text-xs text-gray-400 mt-2">
                *Recommended: 1280x720 pixels
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Upload Video
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-gray-700 text-gray-300"
            >
              Save as Draft
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadPage;