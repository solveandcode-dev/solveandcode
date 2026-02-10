import { UserCheck, Target, Wrench, Calendar, MessageCircle } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: UserCheck,
      title: "Personalized Attention",
      description: "1-on-1 classes mean all focus is on you and your learning pace",
    },
    {
      icon: Target,
      title: "Interview Oriented",
      description: "Learn concepts the way interviewers expect you to explain them",
    },
    {
      icon: Wrench,
      title: "Real-World Skills",
      description: "Build actual projects you can showcase in your portfolio",
    },
    {
      icon: Calendar,
      title: "Daily Practice",
      description: "Consistent practice with homework and review sessions",
    },
    {
      icon: MessageCircle,
      title: "Doubt Clearing",
      description: "Ask questions anytime - no doubt is too small",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What You'll <span className="text-gradient">Gain</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            More than just coding skills - get everything you need to succeed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl bg-card border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
