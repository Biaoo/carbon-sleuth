
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Search from "@/pages/Search";
import Inference from "@/pages/Inference";
import DataRequest from "@/pages/DataRequest";
import Recommendation from "@/pages/Recommendation";
import PredictionResult from "@/pages/PredictionResult";
import NotFound from "@/pages/NotFound";
import "./App.css";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("h-full");
    document.body.classList.add("h-full");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />
        <Route path="/inference" element={<Inference />} />
        <Route path="/prediction-result" element={<PredictionResult />} />
        <Route path="/prediction-result/:id" element={<PredictionResult />} />
        <Route path="/data-request" element={<DataRequest />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
