import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, BookOpen, Layers, FileCode, Boxes } from "lucide-react";

const CurriculumSection = () => {
  const weeks = [
    {
      week: 1,
      title: "Python Foundations",
      icon: Code,
      color: "primary",
      days: [
        { day: "1-2", topic: "Introduction to Python, Variables & Data Types" },
        { day: "3-4", topic: "Operators & Expressions" },
        { day: "5-6", topic: "Conditional Statements (if/elif/else)" },
        { day: "7", topic: "Practice & Review Session" },
      ],
    },
    {
      week: 2,
      title: "Control Flow & Functions",
      icon: BookOpen,
      color: "accent",
      days: [
        { day: "8-10", topic: "Loops - for & while loops" },
        { day: "11-13", topic: "Functions, Parameters & Return Values" },
        { day: "14", topic: "Mini Project #1 - Calculator App" },
      ],
    },
    {
      week: 3,
      title: "Data Structures",
      icon: Layers,
      color: "python-yellow",
      days: [
        { day: "15-16", topic: "Lists & Tuples" },
        { day: "17-18", topic: "Sets & Dictionaries" },
        { day: "19-20", topic: "Real-world examples & practice" },
        { day: "21", topic: "Mini Project #2 - Contact Manager" },
      ],
    },
    {
      week: 4,
      title: "Advanced Topics",
      icon: FileCode,
      color: "teal",
      days: [
        { day: "22-23", topic: "String Manipulation & Methods" },
        { day: "24-25", topic: "File Handling (Read/Write)" },
        { day: "26-27", topic: "Error Handling & Exceptions" },
        { day: "28", topic: "Review & Practice" },
      ],
    },
    {
      week: "5-6",
      title: "OOP & Final Projects",
      icon: Boxes,
      color: "primary",
      days: [
        { day: "29-32", topic: "Object-Oriented Programming Basics" },
        { day: "33-35", topic: "Classes, Objects & Inheritance" },
        { day: "36-40", topic: "Final Projects & Interview Prep" },
        { day: "41-42", topic: "Mock Interviews & Final Review" },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      primary: "bg-primary text-primary-foreground",
      accent: "bg-accent text-accent-foreground",
      "python-yellow": "bg-python-yellow text-foreground",
      teal: "bg-teal text-accent-foreground",
    };
    return colors[color] || colors.primary;
  };

  return (
    <section id="curriculum" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete <span className="text-gradient">Curriculum</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A structured 6-week journey from Python basics to interview-ready skills.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {weeks.map((weekData, index) => (
              <AccordionItem 
                key={index} 
                value={`week-${weekData.week}`}
                className="border rounded-xl px-6 bg-background shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4">
                    <Badge className={`${getColorClasses(weekData.color)} px-3 py-1`}>
                      Week {weekData.week}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <weekData.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold text-lg">{weekData.title}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-3 pl-4">
                    {weekData.days.map((day, dayIndex) => (
                      <div key={dayIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 shrink-0" />
                        <div>
                          <span className="text-muted-foreground text-sm">Day {day.day}:</span>
                          <span className="ml-2">{day.topic}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
