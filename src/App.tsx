
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Search from "@/pages/Search";
import Workspace from "@/pages/Workspace";
import Recommendation from "@/pages/Recommendation";
import PredictionResult from "@/pages/PredictionResult";
import NotFound from "@/pages/NotFound";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import "./App.css";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("h-full");
    document.body.classList.add("h-full");
  }, []);

  return (
    <UserRoleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/prediction-result" element={<PredictionResult />} />
          <Route path="/prediction-result/:id" element={<PredictionResult />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/dashboard" element={<Navigate to="/workspace" replace />} />
          <Route path="/inference" element={<Navigate to="/workspace?tab=inference" replace />} />
          <Route path="/data-request" element={<Navigate to="/workspace?tab=data-request" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </UserRoleProvider>
  );
}
