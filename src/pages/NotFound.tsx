import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 px-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
              <Briefcase className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold mb-2">404</CardTitle>
          <CardDescription className="text-lg">
            Oops! This page seems to be on a career break
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist. But don't worry, 
            there are plenty of great opportunities waiting for you!
          </p>
          
          <div className="flex flex-col space-y-2">
            <Button asChild className="bg-gradient-primary">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/jobs">
                <Search className="h-4 w-4 mr-2" />
                Browse Jobs
              </Link>
            </Button>
            
            <Button asChild variant="ghost" size="sm">
              <Link to="/" className="text-muted-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
