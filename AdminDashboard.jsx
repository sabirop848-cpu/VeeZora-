import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const recentVideos = [
  { title: "Video 1", user: "UserA", views: "125K", status: "Active" },
  { title: "Video 2", user: "UserB", views: "89K", status: "Active" },
];

const reportedContent = [
  { video: "Spam", reporter: "UserC", reason: "Spam", date: "2 hours ago" },
  { video: "Violation", reporter: "UserD", reason: "Violation", date: "5 hours ago" },
];

const AdminDashboard = () => {
  const handleAction = (type) => {
    console.log(`${type} button clicked`);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">VidStream Admin Dashboard</h1>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="flex justify-center gap-4 mb-6">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* VIDEOS TAB */}
        <TabsContent value="videos">
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Video
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Creator
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {recentVideos.map((video, index) => (
                    <tr key={index} className="hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {video.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {video.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {video.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="rounded-full bg-green-900/30 text-green-400 px-2 py-1 font-semibold text-xs">
                          {video.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction("view")}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 ml-2"
                          onClick={() => handleAction("delete")}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* USERS TAB */}
        <TabsContent value="users">
          <div className="bg-gray-900 rounded-xl p-6 text-center text-gray-400">
            User management interface coming soon...
          </div>
        </TabsContent>

        {/* REPORTS TAB */}
        <TabsContent value="reports">
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Video
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Reporter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {reportedContent.map((report, index) => (
                    <tr key={index} className="hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {report.video}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {report.reporter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="rounded-full bg-red-900/30 text-red-400 px-2 py-1 font-semibold text-xs">
                          {report.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction("review")}
                        >
                          Review
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 ml-2"
                          onClick={() => handleAction("dismiss")}
                        >
                          Dismiss
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics">
          <div className="bg-gray-900 rounded-xl p-6 text-center text-gray-400">
            Advanced analytics dashboard coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;