
import React, { useState } from "react";
import { 
  Save, 
  Cog, 
  Upload, 
  Globe, 
  PenTool, 
  Mail, 
  Bell,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminSettings() {
  const { toast } = useToast();
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "InfoStream Africa",
    siteDescription: "Latest news, videos, and updates from across Africa",
    contactEmail: "info@infostreamafrica.com",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    footerText: "© 2023 InfoStream Africa. All rights reserved.",
    enableMaintenanceMode: false
  });
  
  // Content settings
  const [contentSettings, setContentSettings] = useState({
    defaultCategory: "General",
    articlesPerPage: "10",
    enableComments: true,
    requireApproval: true,
    enableTags: true,
    enableFeaturedImages: true,
    allowUserSubmissions: false
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailOnNewArticle: true,
    emailOnUserRegistration: true,
    emailOnComment: false,
    enablePushNotifications: false,
    notifyAdminsOnly: true,
    digestFrequency: "daily"
  });
  
  // SEO settings
  const [seoSettings, setSetSeoSettings] = useState({
    metaTitle: "InfoStream Africa - Latest African News and Media",
    metaDescription: "Stay updated with the latest news, videos, and updates from across Africa. InfoStream Africa is your one-stop destination for reliable information.",
    enableSitemap: true,
    enableRobotsTxt: true,
    enableCanonical: true,
    googleAnalyticsId: "UA-123456789-1",
    structuredData: true
  });

  const handleSaveGeneral = () => {
    // In a real app, this would save to a backend
    console.log("Saving general settings:", generalSettings);
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully."
    });
  };

  const handleSaveContent = () => {
    console.log("Saving content settings:", contentSettings);
    toast({
      title: "Settings saved",
      description: "Your content settings have been updated successfully."
    });
  };

  const handleSaveNotifications = () => {
    console.log("Saving notification settings:", notificationSettings);
    toast({
      title: "Settings saved",
      description: "Your notification settings have been updated successfully."
    });
  };

  const handleSaveSeo = () => {
    console.log("Saving SEO settings:", seoSettings);
    toast({
      title: "Settings saved",
      description: "Your SEO settings have been updated successfully."
    });
  };

  const handleFileUpload = (type: 'logo' | 'favicon') => {
    // In a real app, this would open a file picker and handle the upload
    toast({
      title: "Upload successful",
      description: `Your ${type} has been updated.`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">Configure your InfoStream Africa platform.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="general">
            <Cog className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="content">
            <PenTool className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Globe className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage basic site configuration and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input 
                  id="site-name" 
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  placeholder="InfoStream Africa" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea 
                  id="site-description" 
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  placeholder="Brief description of your site" 
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input 
                  id="contact-email" 
                  type="email" 
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  placeholder="info@yourdomain.com" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 border rounded flex items-center justify-center bg-muted">
                    <img src={generalSettings.logoUrl} alt="Logo" className="max-w-full max-h-full p-1" />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleFileUpload('logo')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 border rounded flex items-center justify-center bg-muted">
                    <img src={generalSettings.faviconUrl} alt="Favicon" className="max-w-full max-h-full" />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleFileUpload('favicon')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Favicon
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footer-text">Footer Text</Label>
                <Input 
                  id="footer-text" 
                  value={generalSettings.footerText}
                  onChange={(e) => setGeneralSettings({...generalSettings, footerText: e.target.value})}
                  placeholder="Copyright text" 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="maintenance-mode" 
                  checked={generalSettings.enableMaintenanceMode}
                  onCheckedChange={(checked) => 
                    setGeneralSettings({...generalSettings, enableMaintenanceMode: checked})
                  }
                />
                <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Content Settings */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Configure how content is displayed and managed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-category">Default Category</Label>
                <Select 
                  value={contentSettings.defaultCategory} 
                  onValueChange={(value) => 
                    setContentSettings({...contentSettings, defaultCategory: value})
                  }
                >
                  <SelectTrigger id="default-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Biochemistry">Biochemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="articles-per-page">Articles Per Page</Label>
                <Select 
                  value={contentSettings.articlesPerPage} 
                  onValueChange={(value) => 
                    setContentSettings({...contentSettings, articlesPerPage: value})
                  }
                >
                  <SelectTrigger id="articles-per-page">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enable-comments" 
                    checked={contentSettings.enableComments}
                    onCheckedChange={(checked) => 
                      setContentSettings({...contentSettings, enableComments: checked})
                    }
                  />
                  <Label htmlFor="enable-comments">Enable Comments</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="require-approval" 
                    checked={contentSettings.requireApproval}
                    onCheckedChange={(checked) => 
                      setContentSettings({...contentSettings, requireApproval: checked})
                    }
                  />
                  <Label htmlFor="require-approval">Require Comment Approval</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enable-tags" 
                    checked={contentSettings.enableTags}
                    onCheckedChange={(checked) => 
                      setContentSettings({...contentSettings, enableTags: checked})
                    }
                  />
                  <Label htmlFor="enable-tags">Enable Article Tags</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enable-featured-images" 
                    checked={contentSettings.enableFeaturedImages}
                    onCheckedChange={(checked) => 
                      setContentSettings({...contentSettings, enableFeaturedImages: checked})
                    }
                  />
                  <Label htmlFor="enable-featured-images">Enable Featured Images</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="allow-user-submissions" 
                    checked={contentSettings.allowUserSubmissions}
                    onCheckedChange={(checked) => 
                      setContentSettings({...contentSettings, allowUserSubmissions: checked})
                    }
                  />
                  <Label htmlFor="allow-user-submissions">Allow User Submissions</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveContent}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email and push notification preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="email-new-article" 
                    checked={notificationSettings.emailOnNewArticle}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailOnNewArticle: checked})
                    }
                  />
                  <Label htmlFor="email-new-article">Email on New Article</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="email-user-registration" 
                    checked={notificationSettings.emailOnUserRegistration}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailOnUserRegistration: checked})
                    }
                  />
                  <Label htmlFor="email-user-registration">Email on User Registration</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="email-comment" 
                    checked={notificationSettings.emailOnComment}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailOnComment: checked})
                    }
                  />
                  <Label htmlFor="email-comment">Email on New Comments</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="push-notifications" 
                    checked={notificationSettings.enablePushNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, enablePushNotifications: checked})
                    }
                  />
                  <Label htmlFor="push-notifications">Enable Push Notifications</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="notify-admins" 
                    checked={notificationSettings.notifyAdminsOnly}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, notifyAdminsOnly: checked})
                    }
                  />
                  <Label htmlFor="notify-admins">Notify Admins Only</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="digest-frequency">Email Digest Frequency</Label>
                <Select 
                  value={notificationSettings.digestFrequency} 
                  onValueChange={(value) => 
                    setNotificationSettings({...notificationSettings, digestFrequency: value})
                  }
                >
                  <SelectTrigger id="digest-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Configure search engine optimization settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Default Meta Title</Label>
                <Input 
                  id="meta-title" 
                  value={seoSettings.metaTitle}
                  onChange={(e) => setSetSeoSettings({...seoSettings, metaTitle: e.target.value})}
                  placeholder="Meta title for homepage" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-description">Default Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  value={seoSettings.metaDescription}
                  onChange={(e) => setSetSeoSettings({...seoSettings, metaDescription: e.target.value})}
                  placeholder="Meta description for homepage" 
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input 
                  id="google-analytics" 
                  value={seoSettings.googleAnalyticsId}
                  onChange={(e) => setSetSeoSettings({...seoSettings, googleAnalyticsId: e.target.value})}
                  placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" 
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enable-sitemap" 
                    checked={seoSettings.enableSitemap}
                    onCheckedChange={(checked) => 
                      setSetSeoSettings({...seoSettings, enableSitemap: checked})
                    }
                  />
                  <Label htmlFor="enable-sitemap">Generate XML Sitemap</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enable-robots" 
                    checked={seoSettings.enableRobotsTxt}
                    onCheckedChange={(checked) => 
                      setSetSeoSettings({...seoSettings, enableRobotsTxt: checked})
                    }
                  />
                  <Label htmlFor="enable-robots">Generate robots.txt</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enable-canonical" 
                    checked={seoSettings.enableCanonical}
                    onCheckedChange={(checked) => 
                      setSetSeoSettings({...seoSettings, enableCanonical: checked})
                    }
                  />
                  <Label htmlFor="enable-canonical">Enable Canonical URLs</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="structured-data" 
                    checked={seoSettings.structuredData}
                    onCheckedChange={(checked) => 
                      setSetSeoSettings({...seoSettings, structuredData: checked})
                    }
                  />
                  <Label htmlFor="structured-data">Enable Structured Data</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSeo}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
