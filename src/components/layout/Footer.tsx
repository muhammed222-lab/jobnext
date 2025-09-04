import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/50 mt-auto">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-primary">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">JobNext</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Connect with the best opportunities and build your career with top companies. 
              JobNext makes job searching simple and efficient.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 JobNext. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Job Seekers</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/jobs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse Jobs
              </Link>
              <Link to="/companies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Company Reviews
              </Link>
              <Link to="/salary" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Salary Guide
              </Link>
              <Link to="/career-advice" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Career Advice
              </Link>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Employers</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/post-job" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Post a Job
              </Link>
              <Link to="/browse-resumes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse Resumes
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Sales
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
            <Link to="/auth/login?type=employer" className="hover:text-foreground transition-colors">
              Employer Sign In
            </Link>
          </div>
          <div>
            Made with ❤️ for job seekers worldwide
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;