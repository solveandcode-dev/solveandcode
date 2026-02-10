import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

interface PricingSectionProps {
  onBookDemo: (plan?: { name: string; price: string; qrCode: string }) => void;
}

const PricingSection = ({ onBookDemo }: PricingSectionProps) => {
  const plans = [
    {
      name: "Demo Class",
      price: "₹200",
      period: "one-time",
      description: "Try before you commit",
      qrCode: "/gpay-qr-200.jpeg",
      features: [
        "1 hour live session",
        "Experience the teaching style",
        "Ask any questions",
        "No commitment required",
      ],
      popular: false,
      cta: "Book Demo",
    },
    {
      name: "Week 1 Trial",
      price: "₹500",
      period: "per day",
      description: "Daily payments for 7 days",
      qrCode: "/gpay-qr-500.jpeg",
      features: [
        "7 daily sessions",
        "Python fundamentals",
        "Daily homework & review",
        "Pay daily - low commitment",
        "Full doubt clearing support",
      ],
      popular: true,
      cta: "Start Week 1",
    },
    {
      name: "Monthly Plan",
      price: "₹12,000",
      period: "per month",
      description: "Best value for serious learners",
      qrCode: "/gpay-qr-12000.jpeg",
      features: [
        "~24 sessions per month",
        "Complete curriculum access",
        "Interview preparation",
        "Real-world projects",
        "Priority support",
        "Career guidance",
      ],
      popular: false,
      cta: "Enroll Now",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start with a demo, try for a week, then commit monthly. Pay via UPI or Bank Transfer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular ? "border-2 border-primary shadow-lg scale-105 md:scale-110" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg gradient-primary">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pt-8 pb-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? "gradient-primary" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => onBookDemo({
                    name: plan.name,
                    price: plan.price,
                    qrCode: plan.qrCode,
                  })}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center mt-8 text-muted-foreground">
          💳 Payment Methods: UPI / Bank Transfer
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
