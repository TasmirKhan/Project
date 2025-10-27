import DashboardStats from '../DashboardStats';
import { Award, Briefcase, Code, TrendingUp } from "lucide-react";

export default function DashboardStatsExample() {
  return (
    <DashboardStats 
      stats={[
        { label: "Overall Score", value: "78", icon: Award, color: "text-primary" },
        { label: "Years Experience", value: "5", icon: Briefcase, color: "text-chart-2" },
        { label: "Skills Identified", value: "24", icon: Code, color: "text-chart-3" },
        { label: "Career Matches", value: "12", icon: TrendingUp, color: "text-chart-4" }
      ]}
    />
  );
}
