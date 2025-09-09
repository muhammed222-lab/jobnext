import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Upload, 
  Edit, 
  Plus, 
  X,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock user data - In production, this would come from Supabase
  const [profile, setProfile] = useState({
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate frontend developer with 6+ years of experience building scalable web applications. Expertise in React, TypeScript, and modern development practices.",
    website: "https://sarahjohnson.dev",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    github: "https://github.com/sarahjohnson"
  });

  const [skills, setSkills] = useState([
    "React", "TypeScript", "JavaScript", "Node.js", "Python", 
    "CSS", "Tailwind CSS", "GraphQL", "AWS", "Docker"
  ]);
  
  const [newSkill, setNewSkill] = useState("");

  const [experience] = useState<Experience[]>([
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechStart Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: "Lead frontend development for a SaaS platform serving 100k+ users. Implemented micro-frontend architecture and improved performance by 40%."
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "Remote",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description: "Developed responsive websites and web applications for various clients. Collaborated with design teams to implement pixel-perfect UIs."
    }
  ]);

  const [education] = useState<Education[]>([
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2016-09",
      endDate: "2020-05",
      gpa: "3.8"
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - In production, this would use Supabase
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsLoading(false);
    }, 1500);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Professional Profile
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Showcase your skills, experience, and accomplishments to attract the best opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 border-2 border-transparent hover:border-primary/10 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4 relative">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-3xl bg-gradient-primary text-white">
                      {profile.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 h-10 w-10 p-0 rounded-full border-2 border-white shadow-md hover:scale-110 transition-all"
                  >
                    <Upload className="h-5 w-5" />
                  </Button>
                </div>
                <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
                <CardDescription className="text-lg">Senior Frontend Developer</CardDescription>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(4.9)</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="truncate font-medium">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="font-medium">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="font-medium">{profile.location}</span>
                  </div>
                  {profile.website && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                      <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                      <a
                        href={profile.website}
                        className="text-primary hover:underline truncate font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Portfolio
                      </a>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                {/* Profile Completion */}
                <div className="text-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Profile Strength</span>
                    <span className="text-sm font-bold text-primary">85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div
                      className="bg-gradient-primary h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Complete your profile to increase visibility
                  </p>
                </div>
                
                <Separator />
                
                {/* Quick Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Profile Views</span>
                    <span className="text-sm font-semibold text-foreground">1.2K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Applications</span>
                    <span className="text-sm font-semibold text-foreground">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Connections</span>
                    <span className="text-sm font-semibold text-foreground">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-secondary/50 p-1 rounded-xl">
                <TabsTrigger
                  value="basic"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3"
                >
                  Basic Info
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg py-3"
                >
                  Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="animate-fade-in-up">
                <Card className="border-2 border-transparent hover:border-primary/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <User className="h-6 w-6 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Update your personal details and professional contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="fullName" className="text-base font-semibold">
                            Full Name *
                          </Label>
                          <Input
                            id="fullName"
                            value={profile.fullName}
                            onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                            required
                            className="h-12 text-lg border-2 focus:border-primary/50 transition-all"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-base font-semibold">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            required
                            className="h-12 text-lg border-2 focus:border-primary/50 transition-all"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="phone" className="text-base font-semibold">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            className="h-12 text-lg border-2 focus:border-primary/50 transition-all"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="location" className="text-base font-semibold">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({...profile, location: e.target.value})}
                            className="h-12 text-lg border-2 focus:border-primary/50 transition-all"
                            placeholder="City, State, Country"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="bio" className="text-base font-semibold">
                          Professional Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          placeholder="Describe your professional background, skills, and career aspirations..."
                          className="min-h-32 text-lg border-2 focus:border-primary/50 transition-all resize-none"
                        />
                        <p className="text-sm text-muted-foreground">
                          {profile.bio.length}/500 characters
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="website" className="text-base font-semibold">
                            Portfolio Website
                          </Label>
                          <Input
                            id="website"
                            type="url"
                            value={profile.website}
                            onChange={(e) => setProfile({...profile, website: e.target.value})}
                            className="h-12 text-lg border-2 focus:border-primary/50 transition-all"
                            placeholder="https://yourportfolio.com"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="linkedin" className="text-base font-semibold">
                            LinkedIn
                          </Label>
                          <Input
                            id="linkedin"
                            type="url"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                            className="h-12 text-lg border-2 focus:border-primary/50 transition-all"
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="github" className="text-base font-semibold">
                            GitHub
                          </Label>
                          <Input
                            id="github"
                            type="url"
                            value={profile.github}
                            onChange={(e) => setProfile({...profile, github: e.target.value})}
                            className="h-12 text-lg border-2 focus:border-primary/50 transition-all"
                            placeholder="https://github.com/username"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-14 text-lg bg-gradient-primary hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Updating Profile...
                          </div>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="animate-fade-in-up">
                <Card className="border-2 border-transparent hover:border-primary/10 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <div>
                      <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-primary" />
                        Work Experience
                      </CardTitle>
                      <CardDescription className="text-lg">
                        Showcase your professional journey and accomplishments
                      </CardDescription>
                    </div>
                    <Button className="bg-gradient-primary hover:shadow-lg px-6">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Experience
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experience.map((exp) => (
                      <div
                        key={exp.id}
                        className="border-2 border-transparent hover:border-primary/10 p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            <p className="text-lg text-muted-foreground mb-2">
                              {exp.company} • {exp.location}
                            </p>
                            <p className="text-sm text-muted-foreground mb-3">
                              {new Date(exp.startDate).toLocaleDateString('en-US', {
                                month: 'long', year: 'numeric'
                              })} - {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', {
                                month: 'long', year: 'numeric'
                              })}
                              {exp.current && (
                                <Badge variant="default" className="ml-3 bg-green-100 text-green-600">
                                  Current
                                </Badge>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {exp.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-lg">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-lg text-destructive border-destructive/50 hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Achievements */}
                        <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">Key Achievements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Improved system performance by 40%</li>
                            <li>• Led a team of 5 developers</li>
                            <li>• Implemented CI/CD pipeline</li>
                          </ul>
                        </div>
                      </div>
                    ))}
                    
                    {experience.length === 0 && (
                      <div className="text-center py-12">
                        <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No experience added yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Add your work experience to showcase your professional journey
                        </p>
                        <Button className="bg-gradient-primary">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Experience
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="animate-fade-in-up">
                <Card className="border-2 border-transparent hover:border-primary/10 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                    <div>
                      <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        Education
                      </CardTitle>
                      <CardDescription className="text-lg">
                        Add your educational background and qualifications
                      </CardDescription>
                    </div>
                    <Button className="bg-gradient-primary hover:shadow-lg px-6">
                      <Plus className="h-5 w-5 mr-2" />
                      Add Education
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {education.map((edu) => (
                      <div
                        key={edu.id}
                        className="border-2 border-transparent hover:border-primary/10 p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-lg text-muted-foreground mb-2">
                              {edu.institution} • {edu.location}
                            </p>
                            <p className="text-sm text-muted-foreground mb-3">
                              {new Date(edu.startDate).toLocaleDateString('en-US', {
                                month: 'long', year: 'numeric'
                              })} - {new Date(edu.endDate).toLocaleDateString('en-US', {
                                month: 'long', year: 'numeric'
                              })}
                            </p>
                            {edu.gpa && (
                              <p className="text-sm font-semibold text-success">
                                GPA: {edu.gpa}/4.0
                              </p>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="rounded-lg">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Relevant Courses */}
                        <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">Relevant Coursework</h4>
                          <div className="flex flex-wrap gap-2">
                            {["Algorithms", "Data Structures", "Web Development", "Database Systems", "Machine Learning"].map((course) => (
                              <Badge key={course} variant="secondary" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {education.length === 0 && (
                      <div className="text-center py-12">
                        <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No education added yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Add your educational background to complete your profile
                        </p>
                        <Button className="bg-gradient-primary">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="animate-fade-in-up">
                <Card className="border-2 border-transparent hover:border-primary/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <Award className="h-6 w-6 text-primary" />
                      Skills & Technologies
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Showcase your expertise to potential hiring teams
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-3">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter a skill (e.g. React, Python, AWS)..."
                        className="h-12 text-lg border-2 focus:border-primary/50 transition-all flex-1"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <Button
                        onClick={addSkill}
                        variant="outline"
                        className="h-12 px-6 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="h-5 w-5" />
                        Add
                      </Button>
                    </div>
                    
                    {skills.length > 0 && (
                      <div className="bg-secondary/50 p-6 rounded-xl">
                        <h4 className="font-semibold text-lg mb-4">Your Skills ({skills.length})</h4>
                        <div className="flex flex-wrap gap-3">
                          {skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="flex items-center gap-2 px-4 py-2 text-base bg-white border-2 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all group"
                            >
                              {skill}
                              <button
                                onClick={() => removeSkill(skill)}
                                className="ml-1 hover:text-destructive transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {skills.length === 0 && (
                      <div className="text-center py-12">
                        <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No skills added yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Start building your skill profile to attract better opportunities
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mb-6">
                          {["React", "TypeScript", "Python", "Node.js", "AWS", "Docker"].map((suggestedSkill) => (
                            <Badge
                              key={suggestedSkill}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-white transition-all"
                              onClick={() => {
                                setNewSkill(suggestedSkill);
                                addSkill();
                              }}
                            >
                              {suggestedSkill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Skill Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <h4 className="font-semibold text-blue-800 mb-3">Technical Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.filter(s => ["React", "TypeScript", "Node.js", "Python"].includes(s)).map(skill => (
                            <Badge key={skill} variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl">
                        <h4 className="font-semibold text-green-800 mb-3">Soft Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Leadership", "Communication", "Teamwork", "Problem Solving"].map(skill => (
                            <Badge key={skill} variant="outline" className="bg-green-100 text-green-700 border-green-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;