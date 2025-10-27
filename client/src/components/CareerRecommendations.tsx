import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ExternalLink } from "lucide-react";

interface CareerPath {
  title: string;
  matchPercentage: number;
  requiredSkills: string[];
  description: string;
}

interface CareerRecommendationsProps {
  recommendations: CareerPath[];
}

export default function CareerRecommendations({ recommendations }: CareerRecommendationsProps) {
  return (
    <Card data-testid="card-career-recommendations">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Career Path Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((career, index) => (
            <Card key={index} className="hover-elevate" data-testid={`career-path-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-lg">{career.title}</h4>
                  <Badge variant="default" className="ml-2">
                    {career.matchPercentage}% Match
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{career.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Profile Match</span>
                    <span className="text-sm text-muted-foreground">{career.matchPercentage}%</span>
                  </div>
                  <Progress value={career.matchPercentage} />
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Key Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="gap-2" data-testid={`button-explore-${index}`}>
                  Explore Path
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
