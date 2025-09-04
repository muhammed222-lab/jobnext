import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Building, 
  ExternalLink,
  Eye,
  MessageSquare,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: "Pending" | "Under Review" | "Shortlisted" | "Interview" | "Rejected" | "Accepted";
  salary: string;
  type: string;
  hasUnreadMessages: boolean;
  lastMessage?: string;
}

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - In production, this would come from Supabase
  const [applications] = useState<Application[]>([
    {
      id: "1",
      jobId: "1",
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      status: "Under Review",
      salary: "$120k - $160k",
      type: "Full-time",
      hasUnreadMessages: true,
      lastMessage: "We'd like to schedule a technical interview"
    },
    {
      id: "2", 
      jobId: "2",
      jobTitle: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      appliedDate: "2024-01-12",
      status: "Shortlisted",
      salary: "$110k - $150k",
      type: "Full-time",
      hasUnreadMessages: false
    },
    {
      id: "3",
      jobId: "3", 
      jobTitle: "UX Designer",
      company: "Design Studio Pro",
      location: "Remote",
      appliedDate: "2024-01-10",
      status: "Interview",
      salary: "$80k - $120k",
      type: "Contract",
      hasUnreadMessages: true,
      lastMessage: "Interview scheduled for tomorrow at 2 PM"
    },
    {
      id: "4",
      jobId: "4",
      jobTitle: "Backend Engineer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      appliedDate: "2024-01-08",
      status: "Pending",
      salary: "$100k - $140k",
      type: "Full-time",
      hasUnreadMessages: false
    },
    {
      id: "5",
      jobId: "5",
      jobTitle: "Data Scientist",
      company: "Analytics Pro",
      location: "Boston, MA",
      appliedDate: "2024-01-05",
      status: "Rejected",
      salary: "$130k - $170k",
      type: "Full-time",
      hasUnreadMessages: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "secondary";
      case "Under Review": return "default";
      case "Shortlisted": return "default";
      case "Interview": return "default";
      case "Accepted": return "default";
      case "Rejected": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Accepted": return "default";
      case "Interview": return "default";
      case "Shortlisted": return "default";
      case "Rejected": return "destructive";
      default: return "outline";
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || app.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          My Applications
        </h1>
        <p className="text-lg text-muted-foreground">
          Track and manage your job applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{applications.length}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts["Under Review"] || 0}</div>
            <div className="text-sm text-muted-foreground">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts["Shortlisted"] || 0}</div>
            <div className="text-sm text-muted-foreground">Shortlisted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{statusCounts["Interview"] || 0}</div>
            <div className="text-sm text-muted-foreground">Interviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{statusCounts["Accepted"] || 0}</div>
            <div className="text-sm text-muted-foreground">Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{statusCounts["Rejected"] || 0}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All ({applications.length})
              </Button>
              <Button 
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                Pending ({statusCounts["Pending"] || 0})
              </Button>
              <Button 
                variant={filterStatus === "under review" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("under review")}
              >
                Under Review ({statusCounts["Under Review"] || 0})
              </Button>
              <Button 
                variant={filterStatus === "interview" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("interview")}
              >
                Interview ({statusCounts["Interview"] || 0})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {application.jobTitle}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {application.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {application.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(application.status)}>
                        {application.status}
                      </Badge>
                      {application.hasUnreadMessages && (
                        <Badge variant="default" className="bg-orange-600">
                          New Message
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium text-success">
                        {application.salary}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {application.type}
                      </Badge>
                    </div>
                  </div>

                  {application.lastMessage && (
                    <div className="mt-3 p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Latest Message:</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {application.lastMessage}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 lg:ml-6">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to={`/jobs/${application.jobId}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Job
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link to={`/chat?job=${application.jobId}`}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                      {application.hasUnreadMessages && (
                        <Badge variant="destructive" className="ml-2 h-2 w-2 p-0"></Badge>
                      )}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No applications found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "You haven't applied to any jobs yet"}
              </p>
              <Button asChild>
                <Link to="/jobs">
                  Browse Jobs
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Applications;