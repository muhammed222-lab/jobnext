import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Filter, Briefcase, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  // Mock job data - In production, this would come from Supabase with real search/filter
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      posted: "2 days ago",
      description: "We're looking for a senior frontend developer to join our innovative team building next-generation web applications using React, TypeScript, and modern development practices.",
      tags: ["React", "TypeScript", "JavaScript", "CSS", "Remote OK"],
      remote: true,
      featured: true
    },
    {
      id: 2,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time", 
      salary: "$110k - $150k",
      posted: "1 day ago",
      description: "Lead product strategy and development for our growing SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences.",
      tags: ["Product Strategy", "Agile", "SaaS", "Analytics"],
      remote: false,
      featured: true
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio Pro",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $120k",
      posted: "3 hours ago",
      description: "Create beautiful and intuitive user experiences for our diverse client portfolio. Experience with Figma, user research, and design systems required.",
      tags: ["Figma", "User Research", "Design Systems", "Prototyping"],
      remote: true,
      featured: false
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$100k - $140k",
      posted: "1 week ago",
      description: "Build scalable backend services using Node.js, Python, and cloud technologies. Join our team working on distributed systems and microservices architecture.",
      tags: ["Node.js", "Python", "AWS", "Docker", "Microservices"],
      remote: true,
      featured: false
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Boston, MA", 
      type: "Full-time",
      salary: "$130k - $170k",
      posted: "4 days ago",
      description: "Apply machine learning and statistical analysis to solve complex business problems. Experience with Python, R, and big data technologies preferred.",
      tags: ["Python", "Machine Learning", "Statistics", "SQL", "R"],
      remote: false,
      featured: false
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Infrastructure Inc",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$115k - $155k",
      posted: "5 days ago",
      description: "Manage and optimize our cloud infrastructure. Experience with Kubernetes, CI/CD, and monitoring tools required.",
      tags: ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform"],
      remote: true,
      featured: false
    }
  ];

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  const salaryRanges = ["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"];

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Find Your Perfect Job
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover {jobs.length} opportunities from top companies
        </p>
      </div>

      {/* Search and Filter Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Job title or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={salaryRange} onValueChange={setSalaryRange}>
              <SelectTrigger>
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent>
                {salaryRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              setSearchTerm("");
              setLocation("");
              setJobType("");
              setSalaryRange("");
            }}>
              Clear Filters
            </Button>
            <Button size="sm">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {jobs.map((job) => (
          <Card key={job.id} className={`group hover:shadow-lg transition-all duration-300 ${job.featured ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {job.title}
                  </CardTitle>
                  {job.featured && (
                    <Badge variant="default" className="text-xs bg-gradient-primary">
                      Featured
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {job.type}
                </Badge>
              </div>
              <CardDescription className="text-base font-medium text-foreground">
                {job.company}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                    {job.remote && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Remote OK
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.posted}
                  </div>
                </div>
                <div className="flex items-center text-lg font-semibold text-success">
                  <DollarSign className="h-5 w-5 mr-1" />
                  {job.salary}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.slice(0, 4).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {job.tags.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.tags.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/jobs/${job.id}`}>
                    View Details
                  </Link>
                </Button>
                <Button asChild className="flex-1 group-hover:shadow-brand transition-all">
                  <Link to={`/jobs/${job.id}/apply`}>
                    Apply Now
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;