import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Briefcase,
  Building,
  User,
  ArrowRight,
  UserCheck,
  FileText,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import CompanyLogosCarousel from "@/components/CompanyLogosCarousel";
import Testimonials from "@/components/Testimonials";
import RatingsSection from "@/components/RatingsSection";

const Home = () => {
  const featuredJobs = [
    {
      _id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Join our innovative team building next-generation web applications...",
    },
    {
      _id: "2",
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time",
      description:
        "Lead product strategy and development for our growing platform...",
    },
    {
      _id: "3",
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      description:
        "Create beautiful and intuitive user experiences for our clients...",
    },
  ];

  const howItWorks = [
    {
      icon: UserCheck,
      title: "Create an Account",
      description:
        "Sign up for free and create a profile that showcases your skills and experience.",
    },
    {
      icon: FileText,
      title: "Find & Apply for Jobs",
      description:
        "Search through thousands of curated job listings and apply with a single click.",
    },
    {
      icon: Award,
      title: "Get Hired",
      description:
        "Connect with top companies, ace the interviews, and land your dream job.",
    },
  ];

  return (
    <div className="flex flex-col bg-slate-950 text-white">
      {/* --- Hero Section --- */}
      <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 text-center min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-950/95 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="container px-4 z-10 relative">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 md:mb-8 animate-fade-in-up delay-100 text-white">
            Discover Remote
            <span className="block mt-2 md:mt-4 text-white">
              Dream Careers
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl md:max-w-4xl mx-auto mb-8 md:mb-12 animate-fade-in-up delay-200 leading-relaxed">
            Join thousands of professionals finding remote opportunities with top companies worldwide.
            Start your journey to work from home and earn on your terms today.
          </p>

          {/* Enhanced search box with glass effect */}
          <div className="max-w-2xl md:max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/20 shadow-xl md:shadow-2xl animate-fade-in-up delay-300">
            <form className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 h-5 md:h-6 w-5 md:w-6 text-slate-300" />
                <Input
                  placeholder="Job title, skills, or company name..."
                  className="h-12 md:h-14 pl-11 md:pl-14 w-full bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/50 text-base md:text-lg"
                />
              </div>
              <Button
                size="lg"
                className="w-full md:w-auto h-12 md:h-14 px-6 md:px-8 bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white/25 hover:border-white/35 text-white text-base md:text-lg font-semibold mt-3 md:mt-0"
              >
                <Search className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
                Find Opportunities
              </Button>
            </form>
            
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up delay-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-sm text-slate-400">Happy Candidates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-slate-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24h</div>
              <div className="text-sm text-slate-400">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Company Logos Section --- */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full animate-float filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full animate-float animation-delay-2000 filter blur-3xl"></div>
        
        <div className="container px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge
              variant="default"
              className="mb-6 px-6 py-2 text-sm font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30"
            >
              🤝 Trusted Partnerships
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by Remote-First Companies
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who trust JobNext to find remote dream careers and work from anywhere
            </p>
          </div>
          
          <div className="relative">
            <CompanyLogosCarousel />
          </div>
          
        </div>
      </section>

      {/* --- Ratings Section --- */}
      <RatingsSection />

      {/* --- Testimonials Section --- */}
      <Testimonials />

      {/* --- How It Works Section --- */}
      <section className="py-20 lg:py-28 bg-slate-900">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              How It Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
              A simple process to start your remote career journey and earn from home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Jobs Section --- */}
      <section className="py-20 lg:py-28 bg-slate-950">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Featured Job Openings
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mt-4">
              Explore curated remote opportunities that let you work from home and earn well.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card
                key={job._id}
                className="flex flex-col group bg-slate-900 border-slate-800 hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <Badge
                      variant={
                        job.type === "Full-time" ? "default" : "secondary"
                      }
                    >
                      {job.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 pt-1">{job.company}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-slate-400 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-3">
                    {job.description}
                  </p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 text-white">
                    <Link to={`/jobs/${job._id}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 text-white"
            >
              <Link to="/jobs">
                <Briefcase className="mr-2 h-5 w-5" />
                Browse All Jobs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="py-20 lg:py-28 bg-primary/90 text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Create an account to start applying for remote jobs and earn from home on your terms.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:border-white/40 text-white">
              <Link to="/auth/signup">
                <User className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
