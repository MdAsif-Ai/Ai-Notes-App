/**
 * User Profile Page Component
 * Displays user profile, account settings, activity history, and preferences
 */
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import AnimatedCard from './AnimatedCard';
import {
  User,
  Mail,
  Calendar,
  Shield,
  Bell,
  Lock,
  Palette,
  FileText,
  TrendingUp,
  Award,
  Upload,
  Settings,
  LogOut,
  Edit,
  Save,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    joinedDate: string;
  };
  onLogout: () => void;
  onUpdateProfile: (updates: any) => void;
}

export default function UserProfile({ user, onLogout, onUpdateProfile }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedRole, setEditedRole] = useState(user.role);

  // Mock user stats
  const userStats = {
    documentsUploaded: 247,
    insightsGenerated: 156,
    knowledgeNodes: 1284,
    hoursActive: 142,
  };

  // Mock activity history
  const recentActivity = [
    { id: 1, action: 'Uploaded Q4 Meeting Notes.pdf', date: '2 hours ago', type: 'upload' },
    { id: 2, action: 'Generated AI Insight: Market Analysis', date: '5 hours ago', type: 'insight' },
    { id: 3, action: 'Added 12 new knowledge nodes', date: '1 day ago', type: 'node' },
    { id: 4, action: 'Uploaded Product Strategy Video', date: '2 days ago', type: 'upload' },
    { id: 5, action: 'Detected contradiction in Budget Reports', date: '3 days ago', type: 'warning' },
  ];

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    autoProcessing: true,
    darkMode: false,
  });

  const handleSaveProfile = () => {
    const updates = {
      name: editedName,
      email: editedEmail,
      role: editedRole,
    };
    onUpdateProfile(updates);
    setIsEditing(false);
    toast.success('Profile updated successfully! ✅');
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
    toast.success('Setting updated');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1>My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
        <Button
          variant="outline"
          onClick={onLogout}
          className="hover:scale-105 transition-transform group"
        >
          <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
          Logout
        </Button>
      </div>

      {/* Profile Overview Card */}
      <AnimatedCard className="border-2 border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative group">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-3xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full w-10 h-10 shadow-lg"
              variant="default"
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <h2>{user.name}</h2>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {user.role}
              </Badge>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-3 text-gray-600">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Joined {formatDate(user.joinedDate)}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <FileText className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                <p className="text-gray-900">{userStats.documentsUploaded}</p>
                <p className="text-xs text-gray-500">Documents</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <TrendingUp className="w-5 h-5 mx-auto text-green-600 mb-1" />
                <p className="text-gray-900">{userStats.insightsGenerated}</p>
                <p className="text-xs text-gray-500">Insights</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <Award className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                <p className="text-gray-900">{userStats.knowledgeNodes}</p>
                <p className="text-xs text-gray-500">Nodes</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <Settings className="w-5 h-5 mx-auto text-orange-600 mb-1" />
                <p className="text-gray-900">{userStats.hoursActive}h</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Tabs Section */}
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6 animate-slide-up">
          <AnimatedCard title="Personal Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    disabled={!isEditing}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={editedRole}
                  onChange={(e) => setEditedRole(e.target.value)}
                  disabled={!isEditing}
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg bg-white disabled:bg-gray-50 disabled:text-gray-500"
                >
                  <option value="executive">Executive</option>
                  <option value="analyst">Analyst</option>
                  <option value="developer">Developer</option>
                  <option value="researcher">Researcher</option>
                </select>
              </div>

              <Separator />

              <div className="flex gap-3">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="hover:scale-105 transition-transform">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSaveProfile} className="hover:scale-105 transition-transform">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(user.name);
                        setEditedEmail(user.email);
                        setEditedRole(user.role);
                      }}
                      className="hover:scale-105 transition-transform"
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard title="Security">
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="••••••••" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="••••••••" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" className="mt-2" />
              </div>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Lock className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </div>
          </AnimatedCard>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6 animate-slide-up">
          <AnimatedCard title="Recent Activity" description="Your latest actions and updates">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg transition-all-smooth hover:border-blue-300 hover:bg-blue-50/30 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${activity.type === 'upload' ? 'bg-blue-100 text-blue-600' : ''}
                    ${activity.type === 'insight' ? 'bg-green-100 text-green-600' : ''}
                    ${activity.type === 'node' ? 'bg-purple-100 text-purple-600' : ''}
                    ${activity.type === 'warning' ? 'bg-orange-100 text-orange-600' : ''}
                  `}>
                    {activity.type === 'upload' && <Upload className="w-5 h-5" />}
                    {activity.type === 'insight' && <TrendingUp className="w-5 h-5" />}
                    {activity.type === 'node' && <Award className="w-5 h-5" />}
                    {activity.type === 'warning' && <Shield className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 animate-slide-up">
          <AnimatedCard title="Notifications">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Browser notifications for alerts</p>
                  </div>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-900">Weekly Digest</p>
                    <p className="text-sm text-gray-500">Summary of your activity</p>
                  </div>
                </div>
                <Switch
                  checked={settings.weeklyDigest}
                  onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
                />
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard title="Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-900">Auto Processing</p>
                    <p className="text-sm text-gray-500">Automatically process uploaded files</p>
                  </div>
                </div>
                <Switch
                  checked={settings.autoProcessing}
                  onCheckedChange={(checked) => handleSettingChange('autoProcessing', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                  </div>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                />
              </div>
            </div>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
