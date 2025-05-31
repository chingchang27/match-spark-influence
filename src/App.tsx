
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import InfluencerLogin from "./pages/InfluencerLogin";
import BusinessLogin from "./pages/BusinessLogin";
import InfluencerSignupForm from "./pages/InfluencerSignupForm";
import BusinessSignupForm from "./pages/BusinessSignupForm";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin/influencer" element={<InfluencerLogin />} />
          <Route path="/signin/business" element={<BusinessLogin />} />
          <Route path="/signup/influencer" element={<InfluencerSignupForm />} />
          <Route path="/signup/business" element={<BusinessSignupForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/influencer-dashboard" element={<InfluencerDashboard />} />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
