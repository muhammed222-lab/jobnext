import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminAuth } from '@/lib/useAdminAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Users, FileText, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const FormAnalytics: React.FC = () => {
  const { currentUser } = useAdminAuth();
  
  const forms = useQuery(api.admin.getAllApplicationForms, currentUser?._id ? { adminUserId: currentUser._id } : 'skip');
  const applications = useQuery(api.admin.getAllApplications, currentUser?._id ? { adminUserId: currentUser._id } : 'skip');
  const jobs = useQuery(api.jobs.list);
  const allFormFields = useQuery(api.admin.getAllFormFields, currentUser?._id ? { adminUserId: currentUser._id } : 'skip');

  // Calculate form usage statistics
  const formStats = forms?.map(form => {
    const formApplications = applications?.filter(app => {
      const job = jobs?.find(j => j._id === app.jobId);
      return job?.applicationFormId === form._id;
    }) || [];

    return {
      id: form._id,
      title: form.title,
      totalApplications: formApplications.length,
      completionRate: formApplications.length > 0 ? 
        (formApplications.filter(app => app.formData && Object.keys(app.formData).length > 0).length / formApplications.length) * 100 : 0,
      avgFieldsPerApplication: formApplications.length > 0 ?
        formApplications.reduce((sum, app) => sum + (app.formData ? Object.keys(app.formData).length : 0), 0) / formApplications.length : 0
    };
  }) || [];

  // Calculate field type usage statistics
  const fieldTypeStats = allFormFields?.reduce((acc, field) => {
    const existing = acc.find(item => item.type === field.fieldType);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ type: field.fieldType, count: 1 });
    }
    return acc;
  }, [] as { type: string; count: number }[]) || [];

  // Calculate application timeline
  const applicationTimeline = applications?.reduce((acc, app) => {
    const date = new Date(app.createdAt).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, [] as { date: string; count: number }[]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(-7) || [];

  const exportAnalytics = () => {
    const data = formStats.map(stat => ({
      Form: stat.title,
      'Total Applications': stat.totalApplications,
      'Completion Rate': `${stat.completionRate.toFixed(1)}%`,
      'Avg Fields per App': stat.avgFieldsPerApplication.toFixed(1)
    }));

    const csvContent = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `form-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (!forms || !applications || !jobs) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Form Analytics</CardTitle>
          <CardDescription>Analytics and statistics for your forms</CardDescription>
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Form Analytics</CardTitle>
            <CardDescription>Analytics and statistics for your forms</CardDescription>
          </div>
          <Button onClick={exportAnalytics} className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Forms</p>
                <h3 className="text-2xl font-bold">{forms.length}</h3>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <h3 className="text-2xl font-bold">{applications.length}</h3>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
                <h3 className="text-2xl font-bold">
                  {formStats.length > 0 ? 
                    (formStats.reduce((sum, stat) => sum + stat.completionRate, 0) / formStats.length).toFixed(1) + '%' : 
                    '0%'}
                </h3>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Forms</p>
                <h3 className="text-2xl font-bold">
                  {formStats.filter(stat => stat.totalApplications > 0).length}
                </h3>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Form Performance</CardTitle>
          <CardDescription>Applications per form</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formStats} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="title" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalApplications" fill="#0088FE" name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Field Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Field Type Distribution</CardTitle>
            <CardDescription>Most used field types across all forms</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fieldTypeStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="type"
                  label={({ type, count }) => `${type}: ${count}`}
                >
                  {fieldTypeStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Application Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Application Timeline</CardTitle>
            <CardDescription>Applications over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicationTimeline} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00C49F" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Form Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Form Statistics</CardTitle>
          <CardDescription>Detailed performance metrics for each form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Form Title</th>
                  <th className="text-right p-4">Applications</th>
                  <th className="text-right p-4">Completion Rate</th>
                  <th className="text-right p-4">Avg Fields</th>
                  <th className="text-right p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {formStats.map((stat) => (
                  <tr key={stat.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{stat.title}</td>
                    <td className="p-4 text-right">{stat.totalApplications}</td>
                    <td className="p-4 text-right">{stat.completionRate.toFixed(1)}%</td>
                    <td className="p-4 text-right">{stat.avgFieldsPerApplication.toFixed(1)}</td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stat.totalApplications > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {stat.totalApplications > 0 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAnalytics;