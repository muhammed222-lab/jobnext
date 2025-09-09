import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminOnly, useAdminAuth } from '@/lib/useAdminAuth';
import UserManagement from './UserManagement';
import ApplicationResults from './ApplicationResults';
import AdvancedFormBuilder from './AdvancedFormBuilder';
import JobManagement from './JobManagement';
import FormAnalytics from './FormAnalytics';

const AdminDashboard: React.FC = () => {
  const { allowed, loading } = useAdminOnly();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', current: location.pathname === '/admin' },
    { name: 'Users', href: '/admin/users', current: location.pathname === '/admin/users' },
    { name: 'Applications', href: '/admin/applications', current: location.pathname.includes('/admin/applications') },
    { name: 'Forms', href: '/admin/forms', current: location.pathname.includes('/admin/forms') },
    { name: 'Jobs', href: '/admin/jobs', current: location.pathname.includes('/admin/jobs') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button asChild variant="outline">
              <Link to="/">Back to Site</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="applications" element={<ApplicationResults />} />
          <Route path="applications/:jobId" element={<ApplicationResults />} />
          <Route path="forms" element={<AdvancedFormBuilder />} />
          <Route path="forms/analytics" element={<FormAnalytics />} />
          <Route path="jobs" element={<JobManagement />} />
        </Routes>
      </main>
    </div>
  );
};

const AdminHome: React.FC = () => {
  const { currentUser } = useAdminAuth();
  const users = useQuery(api.admin.getAllUsers, currentUser?._id ? { adminUserId: currentUser._id } : 'skip');
  const applications = useQuery(api.admin.getAllApplications, currentUser?._id ? { adminUserId: currentUser._id } : 'skip');
  const jobs = useQuery(api.jobs.list);
  const forms = useQuery(api.admin.getAllApplicationForms, currentUser?._id ? { adminUserId: currentUser._id } : 'skip');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users ? users.length : '--'}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications ? applications.length : '--'}</div>
            <p className="text-xs text-muted-foreground">Total applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs ? jobs.length : '--'}</div>
            <p className="text-xs text-muted-foreground">Job postings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{forms ? forms.length : '--'}</div>
            <p className="text-xs text-muted-foreground">Custom forms</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/admin/users">Manage Users</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/applications">View Applications</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/forms">Create Forms</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/jobs">Manage Jobs</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground text-center py-8">
              Activity feed will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;