import LandingHero from "@/components/LandingHero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface LandingProps {
  onGetStarted: () => void;
}

export default function Landing({ onGetStarted }: LandingProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">ResumeAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-features"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-how-it-works"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="link-testimonials"
            >
              Success Stories
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={onGetStarted} data-testid="button-header-start">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <LandingHero onGetStarted={onGetStarted} />
      
      <div id="how-it-works">
        <HowItWorks />
      </div>
      
      <div id="features">
        <Features />
      </div>
      
      <div id="testimonials">
        <Testimonials />
      </div>
      
      <CTASection onGetStarted={onGetStarted} />

      <footer className="border-t py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">ResumeAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 ResumeAI. All rights reserved. Empowering careers with AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
