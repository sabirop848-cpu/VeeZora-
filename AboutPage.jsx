import React from "react";
import { Helmet } from "react-helmet";
import { Play, Users, Video, TrendingUp } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { icon: Users, label: "Active Users", value: "10M+" },
    { icon: Video, label: "Videos Uploaded", value: "500K+" },
    { icon: Play, label: "Hours Watched", value: "1B+" },
    { icon: TrendingUp, label: "Creators", value: "100K+" },
  ];

  return (
    <>
      <Helmet>
        <title>About - VeeZora</title>
        <meta
          name="description"
          content="Learn more about VeeZora – the platform where creators watch, share, and inspire the world."
        />
      </Helmet>

      <div className="p-6 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          About VeeZora
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Watch, Share, and Inspire the World
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-6 text-center transform hover:scale-105 transition-transform"
            >
              <stat.icon className="mx-auto text-purple-400 w-12 h-12 mb-2" />
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Mission */}
        <section className="bg-gray-900 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            Our Mission
          </h2>
          <p className="text-gray-300 leading-relaxed">
            VeeZora is dedicated to empowering creators and connecting
            communities through the power of video. Our mission is to make
            video sharing exciting, engaging, and rewarding for creators and
            viewers alike.
          </p>
        </section>

        {/* What We Offer */}
        <section className="bg-gray-900 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                For Creators
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>🎥 Easy-to-use upload and management tools</li>
                <li>💰 Monetization opportunities</li>
                <li>📊 Advanced analytics</li>
                <li>💬 Engaging community features</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                For Viewers
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>⭐ Personalized recommendations</li>
                <li>📺 High-quality streaming</li>
                <li>🕹️ Interactive features</li>
                <li>🚫 Ad-free premium options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Join Community */}
        <section className="bg-gray-900 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            Join Our Community
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Whether you’re a content creator looking to share your passion or a
            viewer seeking amazing content, VeeZora is the place for you.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Join millions of users who are already part of our growing
            community. Start your journey today and be part of something
            extraordinary. <span className="text-purple-400">Watch</span>,{" "}
            <span className="text-purple-400">Share</span>, and{" "}
            <span className="text-purple-400">Inspire</span> the world with{" "}
            <span className="text-purple-400 font-semibold">VeeZora</span>.
          </p>
        </section>
      </div>
    </>
  );
};

export default AboutPage;