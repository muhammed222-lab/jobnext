import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  User,
  Search,
  Menu,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/lib/useCurrentUser";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("userEmail") || ""
      : "";
  const user = useCurrentUser(email);
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-5 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
      isActive
        ? "text-white bg-primary/80 shadow-lg backdrop-blur-md"
        : "text-slate-300 hover:text-white hover:bg-primary/40 hover:backdrop-blur-md"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-base font-medium rounded-lg backdrop-blur-sm transition-all duration-300 ${
      isActive
        ? "text-primary bg-primary/20"
        : "text-muted-foreground hover:text-primary hover:bg-white/10"
    }`;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 group ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-3xl rounded-b-3xl border-2 border-white/20 shadow-2xl'
          : 'bg-slate-950/95 backdrop-blur-lg border-b border-white/10'
      }`}
      style={{
        background: isScrolled
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.90) 100%)'
          : 'rgba(15, 23, 42, 0.95)',
      }}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-8 transition-all duration-500 ${
        isScrolled ? 'h-14' : 'h-16'
      }`}>
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.ico" alt="JobNext Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-white">JobNext</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/jobs" className={navLinkClass}>
            Find Jobs
          </NavLink>
          <NavLink to="/dashboard?tab=applications" className={navLinkClass}>
            My Applications
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" asChild className="bg-primary/20 hover:bg-primary/30 text-white border-primary/30">
                <Link to="/dashboard">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/40 text-white font-semibold">
                      {user?.fullName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") ||
                        user?.email?.[0]?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary/20 hover:bg-primary/30 text-white border-primary/30"
                onClick={() => {
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("isAdmin");
                  window.location.href = "/auth/login";
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild className="bg-primary/20 hover:bg-primary/30 text-white border-primary/30">
                <Link to="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/80 text-white border-primary/50">
                <Link to="/auth/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20">
          <div className="max-w-7xl mx-auto p-4">
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/jobs"
                className={mobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </NavLink>
              <NavLink
                to="/dashboard?tab=applications"
                className={mobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                My Applications
              </NavLink>
              <div className="border-t my-2" />
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={mobileNavLinkClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => {
                      localStorage.removeItem("userEmail");
                      localStorage.removeItem("isAdmin");
                      window.location.href = "/auth/login";
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild>
                    <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link
                      to="/auth/signup"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

