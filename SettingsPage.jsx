import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Moon, Sun, Bell, Lock, User, Globe } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const SettingsPage = () => {
    const { toast } = useToast();
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        toast({
            title: "Settings saved!",
            description: "Your preferences have been updated.",
        });
    };

    return (
        <Helmet>
            <title>Settings - VidStream</title>
            <meta name="description" content="Manage your VidStream account settings and preferences." />
        </Helmet>

        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-800 hover:from-purple-700 hover:to-pink-700">
                Settings
            </h1>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-gray-900">
                    <TabsTrigger value="general">
                        <Globe className="mr-2 h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="account">
                        <User className="mr-2 h-4 w-4" />
                        Account
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="privacy">
                        <Lock className="mr-2 h-4 w-4" />
                        Privacy
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base font-semibold flex items-center">
                                    {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                    Dark Mode
                                </Label>
                                <p className="text-sm text-gray-400">Toggle between light and dark theme</p>
                            </div>
                            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Input id="language" defaultValue="English" className="bg-gray-800 border-gray-700" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" className="bg-gray-800 border-gray-700" />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="coolcreator" className="bg-gray-800 border-gray-700" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="user@example.com" className="bg-gray-800 border-gray-700" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Input id="bio" defaultValue="Content creator and tech enthusiast" className="bg-gray-800 border-gray-700" />
                        </div>

                        <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-800 hover:from-purple-700 hover:to-pink-700">
                            Save Changes
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Main Notifications</Label>
                                <p className="text-sm text-gray-400">Notifications about new content</p>
                            </div>
                            <Switch checked={notifications} onCheckedChange={setNotifications} />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Email Notifications</Label>
                                <p className="text-sm text-gray-400">Get updates via email</p>
                            </div>
                            <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Comment Replies</Label>
                                <p className="text-sm text-gray-400">Notify when someone replies to your comments</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-6">
                    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Private Account</Label>
                                <p className="text-sm text-gray-400">Only approved followers can see your content</p>
                            </div>
                            <Switch />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base font-semibold">Activity Status</Label>
                                <p className="text-sm text-gray-400">Show when you're online</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;