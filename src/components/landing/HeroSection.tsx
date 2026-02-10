import { Button } from "@/components/ui/button";
import { Code, Users, Target, Sparkles } from "lucide-react";

interface HeroSectionProps {
  // No props needed anymore
}

const HeroSection = () => {
  return (
    <section className="relative gradient-hero min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">1-on-1 Personalized Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Master <span className="text-gradient">Python</span> with <span className="text-gradient">Solve & Code</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              From complete beginner to interview-ready. Get personalized 1-on-1 mentorship, 
              daily practice, and real-world projects. Learn to solve problems and write code like a pro.
            </p>
            
            {/* Value Props */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Personalized Teaching</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Code className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium">Beginner Friendly</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-python-yellow/10">
                  <Target className="w-5 h-5 text-python-yellow" />
                </div>
                <span className="text-sm font-medium">Interview Focused</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="gradient-primary text-lg px-8" asChild>
                <a href="#pricing">Book Demo Class</a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="#curriculum">View Curriculum</a>
              </Button>
            </div>
          </div>
          
          {/* Right Content - Code Preview */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 gradient-primary rounded-3xl opacity-10 blur-3xl transform rotate-6"></div>
            <div className="relative code-block text-primary-foreground rounded-2xl shadow-2xl p-6 transform hover:scale-[1.02] transition-transform">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm leading-relaxed">
                <code>
                  <span className="text-blue-400"># Welcome to Python! 🐍</span>{"\n"}
                  <span className="text-pink-400">def</span> <span className="text-yellow-400">greet_student</span>(name):{"\n"}
                  {"    "}message = <span className="text-green-400">f"Hello, {"{name}"}!"</span>{"\n"}
                  {"    "}<span className="text-pink-400">print</span>(message){"\n"}
                  {"    "}<span className="text-pink-400">return</span> <span className="text-green-400">"Let's learn Python!"</span>{"\n"}
                  {"\n"}
                  <span className="text-blue-400"># Your coding journey starts here</span>{"\n"}
                  greet_student(<span className="text-green-400">"Future Developer"</span>)
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
