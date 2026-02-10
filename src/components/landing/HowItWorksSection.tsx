import { Button } from "@/components/ui/button";
import { CalendarCheck, Zap, Rocket } from "lucide-react";

interface HowItWorksSectionProps {
  onBookDemo: () => void;
}

const HowItWorksSection = ({ onBookDemo }: HowItWorksSectionProps) => {
  const steps = [
    {
      icon: CalendarCheck,
      step: "01",
      title: "Book a Demo Class",
      description: "Experience a trial session to see if we're a good fit.",
    },
    {
      icon: Zap,
      step: "02",
      title: "Complete Week 1 Trial",
      description: "Pay daily for 7 days and learn Python fundamentals with no long-term commitment.",
    },
    {
      icon: Rocket,
      step: "03",
      title: "Continue Monthly",
      description: "Happy with the learning? Switch to the monthly plan and accelerate your journey!",
    },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How to <span className="text-gradient">Get Started</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to begin your Python journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {steps.map((item, index) => (
            <div key={index} className="relative text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border"></div>
              )}
              
              <div className="relative z-10 mx-auto w-24 h-24 rounded-full gradient-primary flex items-center justify-center mb-6 shadow-lg">
                <item.icon className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <span className="text-5xl font-bold text-muted/30">{item.step}</span>
              <h3 className="font-semibold text-xl mb-2 -mt-4">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="gradient-primary text-lg px-10" onClick={onBookDemo}>
            Book Your Demo Class Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
