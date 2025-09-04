import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Eye, EyeOff, Mail, Lock, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [jobSeekerData, setJobSeekerData] = useState({
    fullName: "",
    email: "", 
    password: "",
    confirmPassword: ""
  });
  
  const [employerData, setEmployerData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companySize: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState("job-seeker");
  const { toast } = useToast();

  const handleJobSeekerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jobSeekerData.password !== jobSeekerData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call - In production, this would use Supabase auth
    setTimeout(() => {
      toast({
        title: "Account Created Successfully",
        description: "Welcome to JobNext! You can now start applying for jobs.",
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleEmployerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (employerData.password !== employerData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call - In production, this would use Supabase auth
    setTimeout(() => {
      toast({
        title: "Employer Account Created",
        description: "Welcome to JobNext! You can now start posting jobs.",
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">JobNext</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Join JobNext</CardTitle>
            <CardDescription>
              Create your account and start your journey today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={accountType} onValueChange={setAccountType} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="job-seeker" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Job Seeker
                </TabsTrigger>
                <TabsTrigger value="employer" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Employer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="job-seeker" className="mt-6">
                <form onSubmit={handleJobSeekerSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={jobSeekerData.fullName}
                        onChange={(e) => setJobSeekerData({...jobSeekerData, fullName: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={jobSeekerData.email}
                        onChange={(e) => setJobSeekerData({...jobSeekerData, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={jobSeekerData.password}
                        onChange={(e) => setJobSeekerData({...jobSeekerData, password: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={jobSeekerData.confirmPassword}
                        onChange={(e) => setJobSeekerData({...jobSeekerData, confirmPassword: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-brand transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Job Seeker Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="employer" className="mt-6">
                <form onSubmit={handleEmployerSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employerFullName">Full Name</Label>
                      <Input
                        id="employerFullName"
                        type="text"
                        placeholder="Your name"
                        value={employerData.fullName}
                        onChange={(e) => setEmployerData({...employerData, fullName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Company name"
                        value={employerData.companyName}
                        onChange={(e) => setEmployerData({...employerData, companyName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employerEmail">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="employerEmail"
                        type="email"
                        placeholder="Enter work email"
                        value={employerData.email}
                        onChange={(e) => setEmployerData({...employerData, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employerPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="employerPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={employerData.password}
                        onChange={(e) => setEmployerData({...employerData, password: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employerConfirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="employerConfirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={employerData.confirmPassword}
                        onChange={(e) => setEmployerData({...employerData, confirmPassword: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-brand transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Employer Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Separator className="mb-4" />
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                to="/auth/login" 
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;