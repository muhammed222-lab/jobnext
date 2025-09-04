import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, User, Search, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">JobNext</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/jobs" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Jobs
          </Link>
          <Link 
            to="/companies" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Companies
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth/login">Sign In</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/auth/signup">Post Jobs</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container px-4 py-3">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/jobs" 
                className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Jobs
              </Link>
              <Link 
                to="/companies" 
                className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Companies
              </Link>
              <Link 
                to="/about" 
                className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    Post Jobs
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;