import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Clock,
  Filter,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  // Fetch jobs from backend

  const jobs = useQuery(api.jobs.list, {});
  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("userEmail") || ""
      : "";
  // Application functionality is handled on the dedicated apply page
  // Apply buttons link to /apply/:jobId for complete application process

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ];
  const salaryRanges = ["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container px-4 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Find Your Perfect Job
          </h1>
          <p className="text-lg text-slate-400">
            Discover {Array.isArray(jobs) ? jobs.length : 0} opportunities from
            top companies
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 mb-8 hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-white">Search & Filter Jobs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Job title or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-primary/30"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-primary/30"
              />
            </div>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-primary/30">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type} className="hover:bg-white/10">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={salaryRange} onValueChange={setSalaryRange}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-primary/30">
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10 text-white">
                {salaryRanges.map((range) => (
                  <SelectItem key={range} value={range} className="hover:bg-white/10">
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div
                key={job._id}
                className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-base font-medium text-slate-300">
                      {job.company}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-slate-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                    {job.remote && (
                      <span className="ml-2 rounded-full border border-green-400/30 bg-green-400/10 px-2 py-1 text-xs text-green-400">
                        Remote OK
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-lg font-semibold text-green-400">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {job.salaryRange}
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                  {job.description}
                </p>

                <div className="flex gap-3">
                  <Button asChild variant="outline" className="flex-1 rounded-lg border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                    <Link to={`/jobs/${job._id}`}>View Details</Link>
                  </Button>
                  <Button
                    asChild
                    className="flex-1 rounded-lg bg-primary/20 border-primary/30 text-white hover:bg-primary/30 hover:shadow-xl transition-all"
                  >
                    <Link to={`/apply/${job._id}`}>Apply Now</Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <Briefcase className="h-16 w-16 text-slate-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-white mb-2">No jobs found</h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your search criteria or check back later for new opportunities
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled className="bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white">
              Previous
            </Button>
            <Button variant="default" size="sm" className="bg-primary/20 border-primary/30 text-white hover:bg-primary/30">
              1
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white">
              2
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white">
              3
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
