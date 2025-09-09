import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/lib/useAdminAuth';
import { Download, Eye, FileText, Image as ImageIcon, FileDown, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { convex } from '@/lib/convexClient';

const ApplicationResults: React.FC = () => {
  const { currentUser } = useAdminAuth();
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const { toast } = useToast();

  const applications = useQuery(
    api.admin.getAllApplications,
    currentUser?._id ? { adminUserId: currentUser._id } : 'skip'
  );

  const jobs = useQuery(api.jobs.list);
  const deleteApplication = useMutation(api.admin.deleteApplication);

  const filteredApplications = selectedJob === 'all'
    ? applications
    : applications?.filter(app => app.jobId === selectedJob);

  const getApplicationStatus = (application: any) => {
    const daysSinceApplication = Math.floor((Date.now() - application.createdAt) / (1000 * 60 * 60 * 24));

    if (daysSinceApplication < 1) return { status: 'New', variant: 'default' as const };
    if (daysSinceApplication < 7) return { status: 'Reviewing', variant: 'secondary' as const };
    return { status: 'Processed', variant: 'outline' as const };
  };

  const viewApplicationDetails = async (applicationId: string) => {
    if (!currentUser) return;
    setIsDetailsLoading(true);
    setShowDetailDialog(true);
    try {
      const details = await convex.query(api.admin.getApplicationDetails, { applicationId: applicationId as any, adminUserId: currentUser._id });
      setSelectedApplication(details);
    } catch (error) {
      console.error("Error fetching application details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch application details.",
        variant: "destructive",
      });
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    try {
      await deleteApplication({ applicationId: applicationId as any, adminUserId: currentUser._id });
      toast({
        title: "Success",
        description: "Application deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting application:", error);
      toast({
        title: "Error",
        description: "Failed to delete application.",
        variant: "destructive",
      });
    }
  };

  const isImageFile = (fileName: string) => {
    const name = fileName?.toLowerCase() || '';
    return name.endsWith('.jpg') ||
           name.endsWith('.jpeg') ||
           name.endsWith('.png') ||
           name.endsWith('.gif') ||
           name.endsWith('.webp') ||
           name.endsWith('.svg') ||
           name.endsWith('.bmp') ||
           name.endsWith('.tiff');
  };

  const getFileIcon = (fileName: string) => {
    if (isImageFile(fileName)) {
      return <ImageIcon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  if (!applications || !jobs) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Application Results</CardTitle>
          <CardDescription>View and manage job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Results</CardTitle>
          <CardDescription>View and manage job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-64">
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by job" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobs.map((job) => (
                    <SelectItem key={job._id} value={job._id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredApplications?.length} applications found
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications?.map((application) => {
                  const status = getApplicationStatus(application);
                  const job = jobs.find(j => j._id === application.jobId);
                  
                  return (
                    <TableRow key={application._id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{application.fullName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{application.email}</div>
                        <div className="text-sm text-muted-foreground">{application.phone}</div>
                      </TableCell>
                      <TableCell>
                        {job?.title || 'Unknown Job'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(application.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewApplicationDetails(application._id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the application.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteApplication(application._id)} className="bg-red-500 hover:bg-red-700">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredApplications?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No applications found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Detailed information for {selectedApplication?.fullName}'s application
            </DialogDescription>
          </DialogHeader>

          {isDetailsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          ) : selectedApplication && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Full Name</Label>
                    <p>{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p>{selectedApplication.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p>{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Address</Label>
                    <p>{selectedApplication.address || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Applied Date</Label>
                    <p>{new Date(selectedApplication.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge variant={getApplicationStatus(selectedApplication).variant}>
                      {getApplicationStatus(selectedApplication).status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Skills</Label>
                    <p>{selectedApplication.skills || 'No skills listed'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Salary Expectations</Label>
                    <p>{selectedApplication.salary || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Availability</Label>
                    <p>{selectedApplication.availability || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Cover Letter</Label>
                    <p className="whitespace-pre-wrap">
                      {selectedApplication.coverLetter || 'No cover letter provided'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* File Attachments Section */}
              {selectedApplication.fileUrls && Object.keys(selectedApplication.fileUrls).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">File Attachments</CardTitle>
                    <CardDescription>Uploaded files and documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(selectedApplication.fileUrls).map(([key, url]) => {
                        if (!url) return null;
                        return (
                          <div key={key} className="border rounded-lg p-4 bg-muted/10">
                            <div className="flex items-center justify-between mb-3">
                              <Label className="text-sm font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = url as string;
                                  link.download = key;
                                  link.click();
                                }}
                                className="gap-2"
                              >
                                <Download className="h-3 w-3" />
                                Download
                              </Button>
                            </div>
                            {isImageFile(key) ? (
                              <img src={url as string} alt={key} className="max-w-full h-auto rounded-lg" />
                            ) : (
                              <a href={url as string} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2">
                                {getFileIcon(key)} 
                                View File
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Custom Form Data (Non-file fields) */}
              {selectedApplication.formData && Object.keys(selectedApplication.formData).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Information</CardTitle>
                    <CardDescription>Custom form submission data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedApplication.formData).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <Label className="text-sm font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                            <p className="text-sm bg-muted/20 p-2 rounded-md">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationResults;