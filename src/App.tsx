import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ConvexProvider } from "convex/react";
import { convex } from "./lib/convexClient";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("./pages/Home"));
const Jobs = React.lazy(() => import("./pages/Jobs"));
const JobDetail = React.lazy(() => import("./pages/JobDetail"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Signup = React.lazy(() => import("./pages/auth/Signup"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const CreateJob = React.lazy(() => import("./pages/CreateJob"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ApplyJob = React.lazy(() => import("@/pages/ApplyJob"));
const AdminDashboard = React.lazy(() => import("@/pages/admin/AdminDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <ConvexProvider client={convex}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="jobs/:id" element={<JobDetail />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/create-job" element={<CreateJob />} />
                <Route path="profile" element={<Profile />} />
                <Route path="auth/login" element={<Login />} />
                <Route path="auth/signup" element={<Signup />} />
                <Route path="apply/:jobId" element={<ApplyJob />} />
                <Route path="admin/*" element={<AdminDashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ConvexProvider>
);

export default App;
