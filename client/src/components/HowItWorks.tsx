import { Upload, Brain, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    number: 1,
    icon: Upload,
    title: "Upload Your Resume",
    description: "Drag and drop your resume in PDF or DOCX format. Our secure platform processes it instantly."
  },
  {
    number: 2,
    icon: Brain,
    title: "AI Analysis",
    description: "Advanced AI evaluates your skills, experience, and qualifications against industry standards."
  },
  {
    number: 3,
    icon: Target,
    title: "Get Recommendations",
    description: "Receive personalized career paths, skills gaps, and optimization tips tailored to your goals."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to unlock your career potential
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card key={step.number} className="p-8 hover-elevate" data-testid={`card-step-${step.number}`}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
