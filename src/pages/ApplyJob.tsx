import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, FileText, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const applyMutation = useMutation(api.applications.create);
  const updateApplicationWithFormData = useMutation(api.admin.updateApplicationWithFormData);
  const generateApplicationUploadUrl = useMutation(api.fileUpload.generateApplicationUploadUrl);
  const storeApplicationFile = useMutation(api.fileUpload.storeApplicationFile);
  
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const userEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") || "" : "";
  
  // Get job details to check for custom form
  const job = useQuery(api.jobs.get, jobId ? { jobId: jobId as Id<"jobs"> } : "skip");
  
  // Get default application form as a fallback
  const defaultForm = useQuery(api.admin.getDefaultApplicationForm);

  // Determine which form to use
  const formId = job?.applicationFormId || defaultForm?._id;
  
  const formFields = useQuery(api.admin.getFormFields, formId ? { formId: formId } : "skip");
  
  const [customFormData, setCustomFormData] = useState<Record<string, any>>({});
  const [fileUploads, setFileUploads] = useState<Record<string, any>>({});
  
  const [form, setForm] = useState({
    email: userEmail,
    fullName: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Initialize custom form data with empty values
    if (formFields) {
      const initialData: Record<string, any> = {};
      formFields.forEach(field => {
        if (field.fieldType === 'checkbox') {
          initialData[field.name] = false;
        } else if (field.fieldType === 'select' && field.options && field.options.length > 0) {
          initialData[field.name] = field.options[0];
        } else {
          initialData[field.name] = '';
        }
      });
      setCustomFormData(initialData);
    }
  }, [formFields]);

  const handleCustomFormChange = (fieldName: string, value: any) => {
    setCustomFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFileUpload = async (fieldName: string, file: File) => {
    setIsUploading(true);
    try {
      // Generate upload URL
      const uploadUrl = await generateApplicationUploadUrl();
      
      // Upload file
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      
      const { storageId } = await response.json();
      
      // Store file in temporary state - we'll save the metadata after application creation
      setFileUploads(prev => ({
        ...prev,
        [fieldName]: {
          file,
          storageId,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size
        }
      }));
      
      // Update custom form data with storage ID reference
      handleCustomFormChange(fieldName, storageId);
      
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Check if we have custom form data with required fields
      const hasFirstName = customFormData.firstName;
      const hasSurname = customFormData.surname;
      const hasLastName = customFormData.lastName;
      const hasPhone = customFormData.phone;
      
      // Combine first name fields from custom form or use basic form
      const fullName = hasFirstName && hasSurname && hasLastName
        ? `${customFormData.firstName} ${customFormData.surname} ${customFormData.lastName}`
        : form.fullName || '';
      
      // Use phone from custom form or empty string
      const phone = hasPhone ? customFormData.phone : '';
      
      // Create the application with required fields
      const applicationId = await applyMutation({
        jobId,
        userId: userEmail,
        email: userEmail,
        fullName,
        phone,
        address: form.address || '',
        resumeUrl: '',
        coverLetter: '',
        skills: '',
        salary: '',
        availability: ''
      });
      
      // Update the application with custom form data
      if (Object.keys(customFormData).length > 0) {
        await updateApplicationWithFormData({
          applicationId,
          formData: customFormData
        });
      }
      
      // Store file metadata for uploaded files
      for (const [fieldName, fileData] of Object.entries(fileUploads)) {
        if (fileData && typeof fileData === 'object' && 'storageId' in fileData) {
          await storeApplicationFile({
            storageId: fileData.storageId as any,
            fileName: fileData.fileName,
            fileType: fileData.fileType,
            fileSize: fileData.fileSize,
            applicationId,
            fieldName,
          });
        }
      }
      
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted!",
        variant: "default",
      });
      
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const renderCustomField = (field: any) => {
    const fieldProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      placeholder: field.placeholder,
      className: "h-12 text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/10 focus:border-white/30 transition-all"
    };

    switch (field.fieldType) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
      case 'url':
        return (
          <Input
            type={field.fieldType}
            value={customFormData[field.name] || ''}
            onChange={(e) => handleCustomFormChange(field.name, e.target.value)}
            {...fieldProps}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={customFormData[field.name] || ''}
            onChange={(e) => handleCustomFormChange(field.name, e.target.value)}
            rows={4}
            className="text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/10 focus:border-white/30 transition-all resize-none"
          />
        );
      
      case 'select':
        return (
          <Select
            value={customFormData[field.name] || ''}
            onValueChange={(value) => handleCustomFormChange(field.name, value)}
          >
            <SelectTrigger className={fieldProps.className}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={customFormData[field.name] || false}
              onCheckedChange={(checked) => handleCustomFormChange(field.name, checked)}
            />
            <Label htmlFor={field.name} className="text-sm text-white">
              {field.placeholder}
            </Label>
          </div>
        );
      
      case 'file':
        return (
          <div className="space-y-2">
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(field.name, file);
                }
              }}
              className={fieldProps.className}
            />
            {fileUploads[field.name] && (
              <p className="text-sm text-slate-400">
                Uploaded: {fileUploads[field.name].fileName}
              </p>
            )}
          </div>
        );
      
      default:
        return (
          <Input
            value={customFormData[field.name] || ''}
            onChange={(e) => handleCustomFormChange(field.name, e.target.value)}
            {...fieldProps}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      {/* Glass morphism background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full animate-float filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full animate-float animation-delay-2000 filter blur-3xl"></div>
      
      <div className="container px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Apply for Position
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Complete your application below. We're excited to learn more about you!
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl lg:text-3xl font-bold text-white">
              Application Form
            </CardTitle>
            <CardDescription className="text-lg text-slate-300">
              Please provide your information to complete the application
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Required Information (if not in custom form) */}
              {formFields && formFields.length > 0 && (
                <div className="space-y-6">
                  {/* Full Name (if not in custom form) */}
                  {!formFields.some(f => f.name === 'firstName' && f.name === 'surname' && f.name === 'lastName') && (
                    <div className="space-y-3">
                      <Label htmlFor="fullName" className="text-base font-semibold text-white">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        className="h-12 text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/10 focus:border-white/30 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}
                  
                  {/* Address (if not in custom form) */}
                  {!formFields.some(f => f.name === 'address') && (
                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-base font-semibold text-white">
                        Address *
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="h-12 text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/10 focus:border-white/30 transition-all"
                        placeholder="Enter your full address"
                      />
                    </div>
                  )}
                  
                  {/* Custom Form Fields */}
                  {formFields
                    .sort((a, b) => a.order - b.order)
                    .map((field) => (
                      <div key={field._id} className="space-y-3">
                        <Label htmlFor={field.name} className="text-base font-semibold text-white">
                          {field.label}
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        {renderCustomField(field)}
                      </div>
                    ))}
                </div>
              )}
              
              {(!formFields || formFields.length === 0) && (
                <div className="text-center py-12">
                  <p className="text-slate-400 text-lg">No application form available.</p>
                  <p className="text-slate-500 text-sm mt-2">Please contact the administrator.</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button
                  type="submit"
                  disabled={isLoading || isUploading}
                  className="w-full h-14 text-lg bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white/25 hover:border-white/35 hover:scale-105 text-white font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {(isLoading || isUploading) ? (
                    <div className="flex items-center gap-3">
                      <Loader className="h-5 w-5 animate-spin" />
                      {isUploading ? "Uploading Files..." : "Submitting Application..."}
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                
                <p className="text-sm text-slate-400 text-center mt-4">
                  By submitting this application, you agree to our{" "}
                  <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a> and{" "}
                  <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a>.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              Application Tips
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Tailor your cover letter to this specific position</li>
              <li>• Highlight relevant skills and experience</li>
              <li>• Double-check for spelling and grammar errors</li>
              <li>• Ensure your resume is up-to-date</li>
              <li>• Include quantifiable achievements when possible</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyJob;
