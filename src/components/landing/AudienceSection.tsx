import { GraduationCap, Rocket, Code2, Briefcase, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AudienceSection = () => {
  const audiences = [
    {
      icon: BookOpen,
      title: "School Students",
      description: "High school students (6th-12th grade) wanting to learn programming and build a strong foundation early.",
      color: "primary",
    },
    {
      icon: GraduationCap,
      title: "College Students",
      description: "Computer Science, IT, or any stream looking to add programming skills to your resume.",
      color: "accent",
    },
    {
      icon: Rocket,
      title: "Complete Beginners",
      description: "Never written a line of code? Perfect! We'll start from the very basics together.",
      color: "python-yellow",
    },
    {
      icon: Code2,
      title: "Engineering Students",
      description: "Data Science, AI/ML, or software development aspirants wanting a strong Python foundation.",
      color: "teal",
    },
    {
      icon: Briefcase,
      title: "Job Seekers",
      description: "Preparing for placements, internships, or switching careers into tech.",
      color: "primary",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
      accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
      "python-yellow": { bg: "bg-python-yellow/10", text: "text-python-yellow", border: "border-python-yellow/20" },
      teal: { bg: "bg-teal/10", text: "text-teal", border: "border-teal/20" },
    };
    return colors[color] || colors.primary;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who Is This <span className="text-gradient">Course For?</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're starting fresh or looking to upskill, this course adapts to your needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {audiences.map((item, index) => {
            const colorClasses = getColorClasses(item.color);
            return (
              <Card 
                key={index} 
                className={`border-2 ${colorClasses.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <CardContent className="pt-6">
                  <div className={`p-3 rounded-xl ${colorClasses.bg} w-fit mb-4`}>
                    <item.icon className={`w-6 h-6 ${colorClasses.text}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
