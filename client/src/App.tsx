import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import ResumeUpload from "@/components/ResumeUpload";
import Dashboard from "@/pages/Dashboard";
import type { ResumeAnalysis } from "@shared/schema";

type AppView = "landing" | "upload" | "dashboard";

function App() {
  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysis | null>(null);

  const handleUploadComplete = (analysis: ResumeAnalysis) => {
    setCurrentAnalysis(analysis);
    setCurrentView("dashboard");
  };

  const handleNewAnalysis = () => {
    setCurrentAnalysis(null);
    setCurrentView("upload");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {currentView === "landing" && (
          <Landing onGetStarted={() => setCurrentView("upload")} />
        )}
        {currentView === "upload" && (
          <ResumeUpload onUploadComplete={handleUploadComplete} />
        )}
        {currentView === "dashboard" && currentAnalysis && (
          <Dashboard analysis={currentAnalysis} onNewAnalysis={handleNewAnalysis} />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
