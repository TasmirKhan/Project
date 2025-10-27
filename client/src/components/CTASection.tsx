import { Button } from "@/components/ui/button";
import { Upload, CheckCircle } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-primary/5 to-chart-2/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          Ready to Unlock Your Career Potential?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of successful professionals. Get your free AI-powered resume analysis in seconds.
        </p>
        
        <Button 
          size="lg" 
          onClick={onGetStarted}
          className="gap-2 mb-8"
          data-testid="button-cta-upload"
        >
          <Upload className="w-5 h-5" />
          Analyze Your Resume Free
        </Button>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>Results in under 30 seconds</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>100% secure & confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
}
