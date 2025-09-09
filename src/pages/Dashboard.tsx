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
  MapPin,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  const stats = [
    {
      label: "Applications",
      value: applications ? applications.length : 0,
      icon: Briefcase,
      color: "text-primary",
    },
  ];

  // Tab state
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Career Dashboard
              </h1>
              <div className="flex flex-wrap gap-6 text-lg text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Welcome back,</span>
                  <span className="font-bold text-primary">{user?.fullName || user?.email || email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Last login: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="rounded-full border-white/20 text-white hover:bg-white/10">
                <span className="text-sm">Settings</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {stats.map((stat, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-white group-hover:text-primary transition-colors">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-primary/10 backdrop-blur-md group-hover:bg-primary/20 transition-all`}>
                  <stat.icon className={`h-6 w-6 text-primary group-hover:scale-110 transition-transform`} />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-xs text-slate-500">
                  {index === 0 ? "Active listings" :
                   index === 1 ? "Registered companies" :
                   index === 2 ? "Total users" : "Success rate"}
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* Main Content Tabs - Simplified implementation */}
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="grid w-full grid-cols-2 lg:grid-cols-3 bg-white/5 backdrop-blur-md p-1 rounded-xl border border-white/10 gap-1">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`rounded-lg py-3 px-4 transition-all ${
                activeTab === "jobs"
                  ? "bg-primary text-white shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Job Search
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`rounded-lg py-3 px-4 transition-all ${
                activeTab === "applications"
                  ? "bg-primary text-white shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              My Applications
            </button>
          </div>

          {/* Tab Content */}

          {activeTab === "applications" && (
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300">
              <div>
                <h2 className="text-2xl font-bold text-white">Job Applications</h2>
                <p className="text-slate-400">
                  Track the status of your submitted applications
                </p>
              </div>
              <div className="space-y-4 mt-6">
                {applications && applications.length > 0 ? (
                  applications.map((app, index) => (
                    <div
                      key={app._id}
                      className="p-6 rounded-lg border border-white/10 bg-white/5 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                            {app.jobTitle || "Position Applied"}
                          </h3>
                          <div className="text-sm text-slate-400 mt-1">
                            Applied on {new Date(app.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                          Under Review
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <span className="font-medium text-white">Status:</span>
                          <span>Application Received</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <span className="font-medium text-white">Last Update:</span>
                          <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {app.coverLetter && (
                        <div className="mt-4 p-4 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                          <h4 className="font-semibold text-sm mb-2 text-white">Cover Letter Preview</h4>
                          <p className="text-sm text-slate-400 line-clamp-2">
                            {app.coverLetter}
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex items-center gap-3">
                        <Button variant="outline" size="sm" className="rounded-lg border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact HR
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="h-16 w-16 text-slate-500 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-white mb-2">No applications yet</h3>
                    <p className="text-slate-400 mb-6">
                      Start applying to jobs to track your applications here
                    </p>
                    <Button asChild className="bg-primary/20 border-primary/30 text-white hover:bg-primary/30">
                      <Link to="/jobs" className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Browse Jobs
                      </Link>
                    </Button>
                    <div className="mt-4 text-sm text-slate-400">
                      <p>Tip: Customize your resume and cover letter for each application to increase your chances!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Recent Activity Section */}
        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <p className="text-slate-400">Latest updates and actions on your account</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400 text-sm font-bold">✓</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Profile updated successfully</p>
                  <p className="text-xs text-slate-400">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 text-sm">Email</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">New job recommendation available</p>
                  <p className="text-xs text-slate-400">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
