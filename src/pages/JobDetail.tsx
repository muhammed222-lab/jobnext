import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Building, 
  Users, 
  Calendar,
  Share2,
  Bookmark,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JobDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock job data - In production, this would fetch from Supabase using the ID
  const job = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "2 days ago",
    description: `We're looking for a senior frontend developer to join our innovative team building next-generation web applications. You'll work with cutting-edge technologies and collaborate with talented designers and backend engineers to create exceptional user experiences.

Key Responsibilities:
• Develop and maintain responsive web applications using React and TypeScript
• Collaborate with design and product teams to implement pixel-perfect UIs
• Write clean, efficient, and well-documented code
• Participate in code reviews and contribute to technical decisions
• Mentor junior developers and share best practices
• Stay up-to-date with the latest frontend technologies and trends

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote options
• Professional development budget ($3,000/year)
• Modern office space in downtown San Francisco
• Catered meals and snacks
• Annual team retreats and events`,
    requirements: [
      "5+ years of experience with React and JavaScript/TypeScript",
      "Strong understanding of modern frontend build tools (Webpack, Vite, etc.)",
      "Experience with state management libraries (Redux, Zustand, etc.)",
      "Proficiency in CSS and CSS-in-JS solutions",
      "Experience with testing frameworks (Jest, Cypress, etc.)",
      "Familiarity with Git and collaborative development workflows",
      "Bachelor's degree in Computer Science or equivalent experience"
    ],
    niceToHave: [
      "Experience with Next.js or other React frameworks",
      "Knowledge of backend technologies (Node.js, Python, etc.)",
      "Experience with cloud platforms (AWS, GCP, Azure)",
      "Contributions to open source projects",
      "Experience in a fast-paced startup environment"
    ],
    tags: ["React", "TypeScript", "JavaScript", "CSS", "Remote OK"],
    remote: true,
    featured: true,
    company_info: {
      name: "TechCorp Inc.",
      size: "200-500 employees",
      founded: "2015",
      industry: "Technology, SaaS",
      description: "TechCorp is a leading provider of innovative software solutions that help businesses streamline their operations and improve efficiency.",
      benefits: ["Health Insurance", "401(k)", "Remote Work", "Unlimited PTO", "Stock Options"]
    }
  };

  const handleApply = () => {
    toast({
      title: "Application Started",
      description: "Redirecting to application form...",
    });
    // In production, this would navigate to application form
  };

  const handleSave = () => {
    toast({
      title: "Job Saved",
      description: "This job has been added to your saved jobs.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Job link copied to clipboard!",
    });
  };

  return (
    <div className="container px-4 py-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/jobs">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <CardTitle className="text-2xl lg:text-3xl mb-2">{job.title}</CardTitle>
                  <CardDescription className="text-lg font-medium text-foreground">
                    {job.company}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {job.featured && (
                    <Badge variant="default" className="bg-gradient-primary">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline">{job.type}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Posted {job.posted}
                </div>
                <div className="flex items-center text-sm text-success font-medium">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {job.type}
                </div>
              </div>

              {job.remote && (
                <Badge variant="secondary" className="w-fit">
                  🌎 Remote Work Available
                </Badge>
              )}
            </CardHeader>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                  {job.description}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Required Qualifications</h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-primary mr-2 mt-1">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3 text-foreground">Nice to Have</h4>
                <ul className="space-y-2">
                  {job.niceToHave.map((nice, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-muted-foreground mr-2 mt-1">◦</span>
                      {nice}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-center">Ready to Apply?</CardTitle>
              <CardDescription className="text-center">
                Join {job.company} and take your career to the next level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleApply} className="w-full bg-gradient-primary hover:shadow-brand transition-all">
                Apply for this Job
              </Button>
              <div className="flex gap-2">
                <Button onClick={handleSave} variant="outline" className="flex-1">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleShare} variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                About {job.company_info.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {job.company_info.description}
              </p>
              
              <Separator />
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="font-medium">{job.company_info.industry}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Company Size:</span>
                  <span className="font-medium">{job.company_info.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Founded:</span>
                  <span className="font-medium">{job.company_info.founded}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-2 text-sm">Benefits</h4>
                <div className="flex flex-wrap gap-1">
                  {job.company_info.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button asChild variant="outline" className="w-full">
                <Link to={`/companies/${job.company_info.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  View Company Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-sm mb-1">Frontend Developer</h4>
                  <p className="text-xs text-muted-foreground mb-2">Another Tech Company</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Remote</span>
                    <span className="text-success font-medium">$90k - $130k</span>
                  </div>
                </div>
              ))}
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link to="/jobs">View More Jobs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;