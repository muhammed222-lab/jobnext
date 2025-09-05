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
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Textarea } from "@/components/ui/textarea";
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
  const applyMutation = useMutation(api.applications.create);
  const [showApply, setShowApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    if (!selectedJob) return;
    setIsLoading(true);
    try {
      await applyMutation({
        jobId: selectedJob._id,
        userId: email,
        resumeUrl,
        coverLetter,
        fullName: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        phone: "",
        email: "",
        address: "",
        nextOfKin: "",
        emergencyContact: "",
        nationalId: "",
        passport: "",
        tin: "",
        ssn: "",
        workPermit: "",
        jobTitle: "",
        department: "",
        employeeId: "",
        joiningDate: "",
        employmentType: "",
        workLocation: "",
        supervisor: "",
        education: "",
        certifications: "",
        previousEmployment: "",
        skills: "",
        bankName: "",
        bankAccount: "",
        bankAccountName: "",
        paymentMethod: "",
        salary: "",
        pensionAccount: "",
        taxId: "",
        pensionScheme: "",
        healthInsurance: "",
        otherContributions: "",
        contractAccepted: false,
        offerAccepted: false,
        ndaAccepted: false,
        handbookAccepted: false,
        workTools: "",
      });
      setShowApply(false);
      setResumeUrl("");
      setCoverLetter("");
      // Optionally show a toast here
    } catch (err) {
      // Optionally show error toast
    }
    setIsLoading(false);
  };

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ];
  const salaryRanges = ["$0 - $50k", "$50k - $100k", "$100k - $150k", "$150k+"];

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Find Your Perfect Job
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover {Array.isArray(jobs) ? jobs.length : 0} opportunities from
          top companies
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
        </CardContent>
      </Card>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <Card
              key={job._id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
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
                  </div>
                  <div className="flex items-center text-lg font-semibold text-success">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {job.salaryRange}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {job.description}
                </p>

                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to={`/jobs/${job._id}`}>View Details</Link>
                  </Button>
                  <Button
                    asChild
                    className="flex-1 group-hover:shadow-brand transition-all"
                  >
                    <Link to={`/apply/${job._id}`}>Apply Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            No jobs found.
          </div>
        )}
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
