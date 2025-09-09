import { Link } from "react-router-dom";
import { Briefcase, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/20 bg-slate-900/80 backdrop-blur-lg mt-auto">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/25 shadow-lg group-hover:scale-110 transition-transform">
                <img src="/favicon.ico" alt="JobNext Logo" className="h-10 w-10" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  JobNext
                </span>
                <p className="text-sm text-slate-400 -mt-1">Career Excellence Platform</p>
              </div>
            </Link>
            <p className="text-lg text-slate-400 mb-6 max-w-md leading-relaxed">
              Transform your career journey with our premium job matching platform.
              Discover opportunities that align with your ambitions and career goals.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@jobnext.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              For Job Seekers
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link to="/jobs" className="text-base text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300">
                Browse Jobs
              </Link>
              <Link to="/companies" className="text-base text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300">
                Company Reviews
              </Link>
              <Link to="/salary" className="text-base text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300">
                Salary Guide
              </Link>
              <Link to="/career-advice" className="text-base text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300">
                Career Advice
              </Link>
              <Link to="/resume-builder" className="text-base text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300">
                Resume Builder
              </Link>
            </nav>
          </div>


          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              Stay Updated
            </h3>
            <p className="text-slate-400 mb-4">
              Get the latest job opportunities and career tips
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/5 text-white"
              />
              <button className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg hover:bg-white/20 hover:border-white/30 transition-all">
                Subscribe
              </button>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all">
                  <Twitter className="h-4 w-4 text-white" />
                </a>
                <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all">
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
                <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all">
                  <Facebook className="h-4 w-4 text-white" />
                </a>
                <a href="#" className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all">
                  <Instagram className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              © 2024 JobNext. All rights reserved. • Professional career platform
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link to="/security" className="hover:text-white transition-colors">
                Security
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;