import { Award, BookOpen, Clock, Heart } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    { icon: BookOpen, label: "Years of Coding", value: "5+" },
    { icon: Award, label: "Production Projects", value: "10+" },
    { icon: Clock, label: "AI/ML Technologies", value: "5+" },
    { icon: Heart, label: "Student Rating", value: "4.9/5" },
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo Placeholder */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/python_tutor.png" 
                alt="Python Tutor - Solve & Code Mentor" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stats overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
              <div className="grid grid-cols-4 gap-2">
                {highlights.map((item, index) => (
                  <div key={index} className="bg-card shadow-lg rounded-xl p-3 text-center border">
                    <item.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-lg font-bold">{item.value}</p>
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 lg:pl-8 pt-8 lg:pt-0">
            <h2 className="text-3xl md:text-4xl font-bold">
              Meet Your <span className="text-gradient">Python Mentor</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hi! I'm a passionate Python developer and educator dedicated to helping 
              students master programming through personalized 1-on-1 mentorship.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Professional Experience</h3>
                  <p className="text-muted-foreground text-sm">
                    Working with Python in real-world applications including web development, 
                    data science, and automation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent/10 shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Teaching Philosophy</h3>
                  <p className="text-muted-foreground text-sm">
                    I believe everyone can code. My approach focuses on practical learning, 
                    building confidence, and preparing you for real interviews.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-python-yellow/10 shrink-0">
                  <Heart className="w-5 h-5 text-python-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold">Student Success Focus</h3>
                  <p className="text-muted-foreground text-sm">
                    Your success is my priority. I adapt my teaching style to your 
                    learning pace and goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
