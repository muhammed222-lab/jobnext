import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("userEmail") || ""
      : "";
  const user = useCurrentUser(email);
  const jobs = useQuery(api.jobs.list, {});
  const isAdmin =
    typeof window !== "undefined"
      ? localStorage.getItem("isAdmin") === "1"
      : false;
  // For normal users, fetch applications
  const applications = useQuery(
    api.applications.listByUser,
    !isAdmin && email ? { userId: email } : "skip"
  );

  // Stats (dynamic)
  const stats = isAdmin
    ? [
        {
          label: "Active Jobs",
          value: jobs ? jobs.length : 0,
          icon: Briefcase,
          color: "text-primary",
        },
      ]
    : [
        {
          label: "Applications",
          value: applications ? applications.length : 0,
          icon: Briefcase,
          color: "text-primary",
        },
      ];

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          {isAdmin ? "Employer Dashboard" : "User Dashboard"}
        </h1>
        <div className="mb-2 text-lg text-muted-foreground">
          <div>
            Full Name:{" "}
            <span className="font-semibold text-foreground">
              {user?.fullName || "-"}
            </span>
          </div>
          <div>
            Email:{" "}
            <span className="font-semibold text-foreground">
              {user?.email || email || "-"}
            </span>
          </div>
        </div>
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

      {/* Only show job management for admins/employers */}
      {isAdmin ? (
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
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
                  {jobs && jobs.length > 0 ? (
                    jobs
                      .filter((job) => job.createdBy === email)
                      .map((job) => (
                        <div
                          key={job._id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {job.title}
                              </h3>
                              {/* You can add more job info here */}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.salaryRange}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/jobs/${job._id}`}>
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
                      ))
                  ) : (
                    <div className="text-center text-muted-foreground">
                      No jobs found.
                    </div>
                  )}
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
                  <h3 className="text-lg font-semibold mb-2">
                    Analytics Coming Soon
                  </h3>
                  <p className="text-muted-foreground">
                    Detailed analytics and insights will be available soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Jobs you have applied for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications && applications.length > 0 ? (
                applications.map((app) => (
                  <div key={app._id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {app.jobTitle || "Job"}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          Applied on{" "}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant="outline">Application</Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {app.coverLetter
                        ? app.coverLetter.slice(0, 80) + "..."
                        : "No cover letter"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">
                  You have not applied for any jobs yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
