import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye, 
  Edit, 
  Trash2, 
  MessageSquare,
  Bell,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - In production, this would come from Supabase
  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      status: "Active",
      applicants: 23,
      views: 156,
      posted: "2 days ago",
      type: "Full-time",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      title: "Product Manager",
      status: "Draft",
      applicants: 0,
      views: 0,
      posted: "Draft",
      type: "Full-time",
      location: "New York, NY"
    }
  ]);

  const [applications] = useState([
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      applicantName: "Sarah Johnson",
      appliedDate: "1 day ago",
      status: "Under Review",
      email: "sarah.j@email.com",
      hasUnreadMessages: true
    },
    {
      id: 2,
      jobTitle: "Senior Frontend Developer", 
      applicantName: "Mike Chen",
      appliedDate: "2 days ago",
      status: "Shortlisted",
      email: "mike.c@email.com",
      hasUnreadMessages: false
    }
  ]);

  const stats = [
    { label: "Active Jobs", value: "2", icon: Briefcase, color: "text-primary" },
    { label: "Total Applications", value: "23", icon: Users, color: "text-success" },
    { label: "Job Views", value: "156", icon: Eye, color: "text-blue-600" },
    { label: "Messages", value: "5", icon: MessageSquare, color: "text-orange-600" }
  ];

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Employer Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your job postings and connect with talented candidates
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-2 rounded-lg bg-secondary/50`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jobs">Job Management</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Your Job Posts</CardTitle>
                <CardDescription>
                  Manage and track your job postings
                </CardDescription>
              </div>
              <Button asChild className="bg-gradient-primary">
                <Link to="/dashboard/create-job">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-foreground">{job.applicants}</div>
                        <div className="text-xs text-muted-foreground">Applications</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-foreground">{job.views}</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/jobs/${job.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                Review and manage job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{application.applicantName}</h3>
                        <Badge variant="outline">
                          {application.status}
                        </Badge>
                        {application.hasUnreadMessages && (
                          <Badge variant="default" className="bg-orange-600">
                            New Message
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Applied for: {application.jobTitle}</span>
                        <span>•</span>
                        <span>{application.appliedDate}</span>
                        <span>•</span>
                        <span>{application.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/applications/${application.id}`}>
                          View Profile
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/chat?applicant=${application.id}`}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Job Performance Analytics
              </CardTitle>
              <CardDescription>
                Track the performance of your job postings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and insights will be available once you connect to Supabase.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;