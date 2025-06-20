
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { SidebarProvider } from "@/context/SidebarContext";
import Layout from "@/components/Layout";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Tasks from "./pages/Tasks";
import Expenses from "./pages/Expenses";
import Events from "./pages/Events";
import Communication from "./pages/Communication";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppProvider>
        <NavigationProvider>
          <SidebarProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Auth routes (with auth layout) */}
                  <Route path="/auth/login" element={
                    <AuthPageLayout>
                      <Login />
                    </AuthPageLayout>
                  } />
                  <Route path="/auth/signup" element={
                    <AuthPageLayout>
                      <Signup />
                    </AuthPageLayout>
                  } />
                  <Route path="/auth/forgot-password" element={
                    <AuthPageLayout>
                      <ForgotPassword />
                    </AuthPageLayout>
                  } />
                  
                  {/* Public routes (with public header) */}
                  <Route path="/landing" element={<Landing />} />
                  
                  {/* Main app routes (with layout) */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Index />} />
                    <Route path="calendar" element={<Events />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="communication" element={<Communication />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SidebarProvider>
        </NavigationProvider>
      </AppProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
