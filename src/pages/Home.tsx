import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Users, TrendingUp, Briefcase, Building } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-job-board.jpg";

const Home = () => {
  // Mock data for featured jobs - In production, this would come from Supabase
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      posted: "2 days ago",
      description: "Join our innovative team building next-generation web applications...",
      tags: ["React", "TypeScript", "Remote OK"]
    },
    {
      id: 2,
      title: "Product Manager", 
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110k - $150k",
      posted: "1 day ago",
      description: "Lead product strategy and development for our growing platform...",
      tags: ["Product Strategy", "Agile", "SaaS"]
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $120k",
      posted: "3 hours ago",
      description: "Create beautiful and intuitive user experiences for our clients...",
      tags: ["Figma", "User Research", "Remote"]
    }
  ];

  const stats = [
    { icon: Briefcase, label: "Active Jobs", value: "12,000+" },
    { icon: Building, label: "Companies", value: "3,500+" },
    { icon: Users, label: "Job Seekers", value: "50,000+" },
    { icon: TrendingUp, label: "Success Rate", value: "94%" }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto">
            Find Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Dream Job
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and ambitions.
            Start your career journey today.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur rounded-lg p-6 shadow-brand max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Job title or keyword" 
                  className="pl-10 border-0 bg-secondary/50 focus:bg-white transition-colors"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Location" 
                  className="pl-10 border-0 bg-secondary/50 focus:bg-white transition-colors"
                />
              </div>
              <Button size="lg" className="w-full bg-gradient-primary hover:shadow-brand transition-all">
                Search Jobs
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-3">
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 lg:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Opportunities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover hand-picked jobs from top companies looking for talented professionals like you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="group hover:shadow-lg transition-all duration-300 border-card-border">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {job.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {job.type}
                    </Badge>
                  </div>
                  <CardDescription className="text-base font-medium text-foreground">
                    {job.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      Posted {job.posted}
                    </div>
                    <div className="text-lg font-semibold text-success">
                      {job.salary}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link to={`/jobs/${job.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="default">
              <Link to="/jobs">
                Browse All Jobs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/30 py-16 lg:py-20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream job through JobNext.
            Create your profile today and get discovered by top employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default">
              <Link to="/auth/signup">
                Create Profile
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/auth/signup">
                Post a Job
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;