import { useParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
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

  // Fetch actual job data from Convex
  const job = useQuery(api.jobs.get, id ? { jobId: id } : "skip");

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

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading job details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white">
          <Link to="/jobs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{job.title}</h1>
                  <p className="text-lg font-medium text-slate-300">
                    {job.createdBy}
                  </p>
                </div>
                <div className="flex gap-2">
                  {job.urgent && (
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                      Urgent
                    </span>
                  )}
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-300">
                    {job.type || 'Full-time'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center text-sm text-slate-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(job.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-green-400 font-medium">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {job.salaryRange || 'Negotiable'}
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {job.workMode || 'On-site'}
                </div>
              </div>

              {job.remote && (
                <span className="rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs text-green-400">
                  Remote Work Available
                </span>
              )}
            </div>

            {/* Job Description */}
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans">
                  {job.description}
                </pre>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300">
                <h2 className="text-xl font-bold text-white mb-4">Requirements</h2>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans">
                    {job.requirements}
                  </pre>
                </div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300">
                <h2 className="text-xl font-bold text-white mb-4">Benefits</h2>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans">
                    {job.benefits}
                  </pre>
                </div>
              </div>
            )}

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300">
                <h2 className="text-xl font-bold text-white mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, index: number) => (
                    <span key={index} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300 sticky top-6">
              <h3 className="text-xl font-bold text-white text-center mb-2">Ready to Apply?</h3>
              <p className="text-slate-400 text-center mb-4">
                Join {job.company} and take your career to the next level
              </p>
              <div className="space-y-3">
                <Button onClick={handleApply} className="w-full bg-primary/20 border-primary/30 text-white hover:bg-primary/30 hover:shadow-xl transition-all">
                  Apply for this Job
                </Button>
                <div className="flex gap-2">
                  <Button onClick={handleSave} variant="outline" className="flex-1 bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="flex-1 bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300">
              <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                <Building className="h-5 w-5" />
                About {job.createdBy}
              </h3>
              <div className="space-y-4 mt-4">
                <p className="text-sm text-slate-400">
                  This job was posted by {job.createdBy}. Contact them directly for more information about the company.
                </p>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-primary/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-white/10 rounded-lg p-3 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/30 transition-colors cursor-pointer">
                    <h4 className="font-medium text-sm mb-1 text-white">Frontend Developer</h4>
                    <p className="text-xs text-slate-400 mb-2">Another Tech Company</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Remote</span>
                      <span className="text-green-400 font-medium">$90k - $130k</span>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white">
                  <Link to="/jobs">View More Jobs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;