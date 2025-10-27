import { Award, TrendingUp, FileSearch, Lightbulb, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Award,
    title: "Resume Scoring",
    description: "Get a comprehensive score based on presentation, content, and keyword optimization.",
    benefit: "Know exactly where you stand"
  },
  {
    icon: TrendingUp,
    title: "Career Path Recommendations",
    description: "Discover personalized career opportunities that match your skills and experience.",
    benefit: "Find your perfect role"
  },
  {
    icon: FileSearch,
    title: "Skills Gap Analysis",
    description: "Identify missing skills for your target roles with learning resource suggestions.",
    benefit: "Bridge the gap to success"
  },
  {
    icon: Lightbulb,
    title: "Optimization Suggestions",
    description: "Receive actionable tips to improve keywords, formatting, and content structure.",
    benefit: "Stand out from competitors"
  },
  {
    icon: Users,
    title: "Industry Insights",
    description: "Compare your resume against industry standards and top performers in your field.",
    benefit: "Meet market expectations"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your complete analysis in seconds with our powerful AI engine.",
    benefit: "Save time, act faster"
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to optimize your resume and accelerate your career
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover-elevate" data-testid={`card-feature-${index}`}>
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-3 leading-relaxed">{feature.description}</p>
              <p className="text-sm text-primary font-medium">{feature.benefit}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
