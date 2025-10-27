import { Button } from "@/components/ui/button";
import { Upload, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Professional_office_workspace_hero_image_6076ad75.png";

interface LandingHeroProps {
  onGetStarted: () => void;
}

export default function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="text-primary-foreground text-sm font-semibold tracking-wide uppercase">AI-Powered Analysis</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
          Transform Your Resume Into Your Dream Career
        </h1>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get instant AI-powered insights, personalized career recommendations, and actionable optimization tips to stand out from the competition.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            variant="default"
            onClick={onGetStarted}
            className="gap-2"
            data-testid="button-get-started"
          >
            <Upload className="w-5 h-5" />
            Analyze My Resume
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-background/10 backdrop-blur-sm border-white/20 text-white hover:bg-background/20"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-chart-2 border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-chart-4 border-2 border-white" />
          </div>
          <span>Trusted by 50,000+ job seekers worldwide</span>
        </div>
      </div>
    </section>
  );
}
