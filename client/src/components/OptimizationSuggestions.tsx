import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

interface Suggestion {
  title: string;
  priority: "high" | "medium" | "low";
  description: string;
  examples: string[];
}

interface OptimizationSuggestionsProps {
  suggestions: Suggestion[];
}

export default function OptimizationSuggestions({ suggestions }: OptimizationSuggestionsProps) {
  const getPriorityIcon = (priority: string) => {
    if (priority === "high") return <AlertCircle className="w-5 h-5 text-destructive" />;
    if (priority === "medium") return <Info className="w-5 h-5 text-chart-4" />;
    return <CheckCircle2 className="w-5 h-5 text-chart-2" />;
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === "high") return { label: "High Impact", variant: "destructive" as const };
    if (priority === "medium") return { label: "Medium Impact", variant: "default" as const };
    return { label: "Low Impact", variant: "secondary" as const };
  };

  return (
    <Card data-testid="card-optimization">
      <CardHeader>
        <CardTitle>Optimization Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {suggestions.map((suggestion, index) => {
            const badge = getPriorityBadge(suggestion.priority);
            return (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`suggestion-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    {getPriorityIcon(suggestion.priority)}
                    <span className="font-medium">{suggestion.title}</span>
                    <Badge variant={badge.variant} className="ml-2">
                      {badge.label}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 pl-8 space-y-4">
                    <p className="text-muted-foreground">{suggestion.description}</p>
                    {suggestion.examples.length > 0 && (
                      <div>
                        <p className="font-medium mb-2 text-sm">Examples:</p>
                        <ul className="space-y-2">
                          {suggestion.examples.map((example, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
