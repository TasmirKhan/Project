import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  category: string;
  proficiency: number;
}

interface SkillsAnalysisProps {
  skills: Skill[];
}

export default function SkillsAnalysis({ skills }: SkillsAnalysisProps) {
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const getProficiencyLabel = (prof: number) => {
    if (prof >= 80) return "Expert";
    if (prof >= 60) return "Advanced";
    if (prof >= 40) return "Intermediate";
    return "Beginner";
  };

  return (
    <Card data-testid="card-skills-analysis">
      <CardHeader>
        <CardTitle>Skills Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                {category}
              </h4>
              <div className="space-y-3">
                {skills
                  .filter(s => s.category === category)
                  .map((skill, index) => (
                    <div key={index} data-testid={`skill-${category}-${index}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {getProficiencyLabel(skill.proficiency)}
                        </Badge>
                      </div>
                      <Progress value={skill.proficiency} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
