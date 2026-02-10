import { Clock, Code, Brain, FileEdit } from "lucide-react";

const SessionSection = () => {
  const sessionParts = [
    {
      icon: Brain,
      title: "Topic Explanation",
      duration: "15 mins",
      description: "Clear, concept-driven explanations with real-world examples",
      color: "primary",
    },
    {
      icon: Code,
      title: "Live Coding",
      duration: "20 mins",
      description: "Watch and learn as we code together in real-time",
      color: "accent",
    },
    {
      icon: FileEdit,
      title: "Practice Together",
      duration: "15 mins",
      description: "Solve problems together with instant feedback",
      color: "python-yellow",
    },
    {
      icon: Clock,
      title: "Homework Assignment",
      duration: "10 mins",
      description: "Daily practice tasks to reinforce your learning",
      color: "teal",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary" },
      accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent" },
      "python-yellow": { bg: "bg-python-yellow/10", text: "text-python-yellow", border: "border-python-yellow" },
      teal: { bg: "bg-teal/10", text: "text-teal", border: "border-teal" },
    };
    return colors[color] || colors.primary;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What a <span className="text-gradient">Session Looks Like</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Each 1-hour class is carefully structured for maximum learning and engagement.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
            
            <div className="space-y-6">
              {sessionParts.map((part, index) => {
                const colorClasses = getColorClasses(part.color);
                return (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className={`hidden md:flex w-16 h-16 rounded-full ${colorClasses.bg} items-center justify-center shrink-0 relative z-10 border-4 border-background`}>
                      <part.icon className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>
                    
                    {/* Content card */}
                    <div className={`flex-1 p-6 rounded-xl border-l-4 ${colorClasses.border} bg-card shadow-sm`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`md:hidden p-2 rounded-lg ${colorClasses.bg}`}>
                          <part.icon className={`w-5 h-5 ${colorClasses.text}`} />
                        </div>
                        <h3 className="font-semibold text-lg">{part.title}</h3>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${colorClasses.bg} ${colorClasses.text}`}>
                          {part.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{part.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SessionSection;
