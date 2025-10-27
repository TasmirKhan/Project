import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
}

interface ResumeScoreProps {
  overallScore: number;
  breakdown: ScoreBreakdown[];
}

export default function ResumeScore({ overallScore, breakdown }: ResumeScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", variant: "default" as const };
    if (score >= 60) return { label: "Good", variant: "secondary" as const };
    return { label: "Needs Improvement", variant: "destructive" as const };
  };

  const badge = getScoreBadge(overallScore);

  return (
    <Card data-testid="card-resume-score">
      <CardHeader>
        <CardTitle>Resume Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - overallScore / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-5xl font-semibold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </span>
            </div>
          </div>
          <Badge variant={badge.variant}>{badge.label}</Badge>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold mb-3">Score Breakdown</h4>
          {breakdown.map((item, index) => (
            <div key={index} data-testid={`score-category-${index}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.category}</span>
                <span className="text-sm text-muted-foreground">
                  {item.score}/{item.maxScore}
                </span>
              </div>
              <Progress value={(item.score / item.maxScore) * 100} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
