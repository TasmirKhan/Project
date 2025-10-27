import { Button } from "@/components/ui/button";
import { Sparkles, Download, Share2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import DashboardStats from "@/components/DashboardStats";
import ResumeScore from "@/components/ResumeScore";
import SkillsAnalysis from "@/components/SkillsAnalysis";
import CareerRecommendations from "@/components/CareerRecommendations";
import OptimizationSuggestions from "@/components/OptimizationSuggestions";
import { Award, Briefcase, Code, TrendingUp } from "lucide-react";
import type { ResumeAnalysis } from "@shared/schema";

interface DashboardProps {
  analysis: ResumeAnalysis;
  onNewAnalysis: () => void;
}

export default function Dashboard({ analysis, onNewAnalysis }: DashboardProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">ResumeAI</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" data-testid="button-download">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Report</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" data-testid="button-share">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <ThemeToggle />
            <Button onClick={onNewAnalysis} data-testid="button-new-analysis">
              New Analysis
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Resume Analysis Results</h1>
          <p className="text-muted-foreground">
            Analysis for {analysis.fileName}
          </p>
        </div>

        <DashboardStats
          stats={[
            { label: "Overall Score", value: String(analysis.overallScore), icon: Award, color: "text-primary" },
            { label: "Years Experience", value: String(analysis.experienceYears), icon: Briefcase, color: "text-chart-2" },
            { label: "Skills Identified", value: String(analysis.skillsCount), icon: Code, color: "text-chart-3" },
            { label: "Career Matches", value: String(analysis.careerMatchesCount), icon: TrendingUp, color: "text-chart-4" }
          ]}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ResumeScore
              overallScore={analysis.overallScore}
              breakdown={analysis.scoreBreakdown}
            />

            <SkillsAnalysis skills={analysis.skills} />

            <OptimizationSuggestions suggestions={analysis.optimizationSuggestions} />
          </div>

          <div className="space-y-6">
            <CareerRecommendations recommendations={analysis.careerRecommendations} />
          </div>
        </div>
      </main>
    </div>
  );
}
