import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";
import Chat from "./pages/Chat";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import EmployerLogin from "./pages/auth/EmployerLogin";
import { ConvexProvider } from "convex/react";
import { convex } from "./lib/convexClient";
import ApplyJob from "@/pages/ApplyJob";

const queryClient = new QueryClient();

const App = () => (
  <ConvexProvider client={convex}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="jobs/:id" element={<JobDetail />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/create-job" element={<CreateJob />} />
              <Route path="chat" element={<Chat />} />
              <Route path="applications" element={<Applications />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/employer-login" element={<EmployerLogin />} />
            <Route path="/apply/:jobId" element={<ApplyJob />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ConvexProvider>
);

export default App;
