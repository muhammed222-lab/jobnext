import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Check, 
  X, 
  MessageSquare, 
  Briefcase, 
  User, 
  Calendar,
  Settings,
  CheckCircle,
  Archive
} from "lucide-react";

interface Notification {
  id: string;
  type: "message" | "application" | "job" | "interview" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "New message from TechCorp Inc.",
      message: "We'd like to schedule a technical interview for the Senior Frontend Developer position.",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false,
      actionUrl: "/chat?company=techcorp",
      actionText: "View Message"
    },
    {
      id: "2",
      type: "application",
      title: "Application status updated",
      message: "Your application for Product Manager at StartupXYZ has been moved to 'Under Review'.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      actionUrl: "/applications",
      actionText: "View Application"
    },
    {
      id: "3",
      type: "job",
      title: "New job matches found",
      message: "3 new jobs matching your profile have been posted.",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: true,
      actionUrl: "/jobs",
      actionText: "Browse Jobs"
    },
    {
      id: "4",
      type: "interview",
      title: "Interview reminder",
      message: "You have an interview with Design Studio Pro tomorrow at 2:00 PM.",
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      read: true,
      actionUrl: "/calendar",
      actionText: "View Calendar"
    },
    {
      id: "5",
      type: "system",
      title: "Profile completion",
      message: "Complete your profile to increase your chances of getting hired by 75%.",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
      actionUrl: "/profile",
      actionText: "Update Profile"
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    messageAlerts: true,
    applicationUpdates: true,
    interviewReminders: true,
    weeklyDigest: false
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case "application": return <Briefcase className="h-5 w-5 text-green-600" />;
      case "job": return <Briefcase className="h-5 w-5 text-purple-600" />;
      case "interview": return <Calendar className="h-5 w-5 text-orange-600" />;
      case "system": return <Settings className="h-5 w-5 text-gray-600" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "message": return "border-l-blue-500";
      case "application": return "border-l-green-500";
      case "job": return "border-l-purple-500";
      case "interview": return "border-l-orange-500";
      case "system": return "border-l-gray-500";
      default: return "border-l-muted";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const recentNotifications = notifications.filter(n => 
    new Date(n.timestamp).getTime() > Date.now() - 86400000 // Last 24 hours
  );

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / 60000);
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Notifications
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with your job search activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Badge variant="default" className="flex items-center gap-1">
              <Bell className="h-3 w-3" />
              {unreadCount} unread
            </Badge>
          )}
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            All Notifications ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="recent">
            Recent ({recentNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="settings">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all hover:shadow-md border-l-4 ${getTypeColor(notification.type)} ${
                  !notification.read ? 'bg-primary/5 border-primary/20' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.actionUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={notification.actionUrl}>
                                {notification.actionText}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      {!notification.read && (
                        <Button
                          onClick={() => markAsRead(notification.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteNotification(notification.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! Check back later for new updates.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentNotifications.length > 0 ? (
            recentNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all hover:shadow-md border-l-4 ${getTypeColor(notification.type)} ${
                  !notification.read ? 'bg-primary/5 border-primary/20' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.actionUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={notification.actionUrl}>
                                {notification.actionText}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      {!notification.read && (
                        <Button
                          onClick={() => markAsRead(notification.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteNotification(notification.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No recent notifications</h3>
                <p className="text-muted-foreground">
                  No notifications from the last 24 hours.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose how you want to be notified about job-related activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">General Settings</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </div>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({...prev, emailNotifications: checked}))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Get instant browser notifications
                      </div>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({...prev, pushNotifications: checked}))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Weekly Digest</Label>
                      <div className="text-sm text-muted-foreground">
                        Weekly summary of your activity
                      </div>
                    </div>
                    <Switch
                      checked={settings.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({...prev, weeklyDigest: checked}))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Job Activity</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">New Job Matches</Label>
                      <div className="text-sm text-muted-foreground">
                        Jobs matching your preferences
                      </div>
                    </div>
                    <Switch
                      checked={settings.jobAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({...prev, jobAlerts: checked}))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">New Messages</Label>
                      <div className="text-sm text-muted-foreground">
                        Messages from employers
                      </div>
                    </div>
                    <Switch
                      checked={settings.messageAlerts}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({...prev, messageAlerts: checked}))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Application Updates</Label>
                      <div className="text-sm text-muted-foreground">
                        Changes to your application status
                      </div>
                    </div>
                    <Switch
                      checked={settings.applicationUpdates}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({...prev, applicationUpdates: checked}))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Interview Reminders</Label>
                      <div className="text-sm text-muted-foreground">
                        Upcoming interviews and meetings
                      </div>
                    </div>
                    <Switch
                      checked={settings.interviewReminders}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({...prev, interviewReminders: checked}))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="bg-gradient-primary">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;