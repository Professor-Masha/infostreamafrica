
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "@/components/ui/use-toast";
import { Shield, User, Key, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function UserProfile() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const location = useLocation();
  
  const [userData, setUserData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    fullName: user?.fullName || '',
    avatar: user?.avatar || '',
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareProfile: false,
    receiveNotifications: true,
    showActivity: true,
    useCookies: true,
    dataCollection: true,
  });
  
  useEffect(() => {
    // Check if we need to open a specific tab based on URL params
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'privacy') {
      setActiveTab('privacy');
    }
  }, [location]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: value
    });
  };
  
  const handleSaveProfile = () => {
    // In a real application, this would make an API call to update the user profile
    if (user) {
      const updatedUser = {
        ...user,
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        avatar: userData.avatar,
      };
      
      // Update in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update in context
      login(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsEditing(false);
    }
  };
  
  const handleSavePrivacy = () => {
    // In a real application, this would make an API call to update privacy settings
    toast({
      title: "Privacy settings updated",
      description: "Your privacy preferences have been saved.",
    });
  };
  
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  {userData.avatar ? (
                    <AvatarImage src={userData.avatar} alt={userData.username} />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {userData.username?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-medium">{userData.fullName || userData.username}</h2>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                <Button 
                  variant={activeTab === 'profile' ? "secondary" : "ghost"} 
                  className="flex items-center justify-start gap-2 rounded-none h-12 px-4"
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="h-4 w-4" /> Profile Information
                </Button>
                <Button 
                  variant={activeTab === 'privacy' ? "secondary" : "ghost"} 
                  className="flex items-center justify-start gap-2 rounded-none h-12 px-4"
                  onClick={() => setActiveTab('privacy')}
                >
                  <Shield className="h-4 w-4" /> Privacy Settings
                </Button>
                <Button 
                  variant={activeTab === 'security' ? "secondary" : "ghost"} 
                  className="flex items-center justify-start gap-2 rounded-none h-12 px-4"
                  onClick={() => setActiveTab('security')}
                >
                  <Key className="h-4 w-4" /> Password & Security
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and how it appears on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={userData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={userData.username}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Avatar URL</Label>
                        <Input
                          id="avatar"
                          name="avatar"
                          value={userData.avatar}
                          onChange={handleInputChange}
                          placeholder="https://example.com/avatar.jpg"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                          <p>{userData.fullName || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Username</p>
                          <p>{userData.username}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{userData.email}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control how your information is used and shared on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Share Profile Information</h3>
                      <p className="text-sm text-muted-foreground">Allow other users to see your profile details</p>
                    </div>
                    <Switch 
                      checked={privacySettings.shareProfile} 
                      onCheckedChange={(checked) => handlePrivacyChange('shareProfile', checked)} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive updates and newsletters via email</p>
                    </div>
                    <Switch 
                      checked={privacySettings.receiveNotifications} 
                      onCheckedChange={(checked) => handlePrivacyChange('receiveNotifications', checked)} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Activity Tracking</h3>
                      <p className="text-sm text-muted-foreground">Track which articles you've viewed to provide better recommendations</p>
                    </div>
                    <Switch 
                      checked={privacySettings.showActivity} 
                      onCheckedChange={(checked) => handlePrivacyChange('showActivity', checked)} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Cookie Usage</h3>
                      <p className="text-sm text-muted-foreground">Allow cookies to enhance your browsing experience</p>
                    </div>
                    <Switch 
                      checked={privacySettings.useCookies} 
                      onCheckedChange={(checked) => handlePrivacyChange('useCookies', checked)} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Data Collection</h3>
                      <p className="text-sm text-muted-foreground">Allow anonymous data collection to improve our services</p>
                    </div>
                    <Switch 
                      checked={privacySettings.dataCollection} 
                      onCheckedChange={(checked) => handlePrivacyChange('dataCollection', checked)} 
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Data Protection Notice</h4>
                      <p className="text-sm text-muted-foreground">
                        Your data is stored securely and never shared with third parties without your explicit consent.
                        We comply with GDPR and other applicable data protection regulations.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSavePrivacy}>
                    Save Privacy Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings and login preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Active Sessions</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      You're currently logged in on this device. You can log out of all other devices if needed.
                    </p>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Log out of all other devices
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
