import { Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg gradient-primary">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gradient">Solve & Code</span>
              <span className="text-xs text-muted-foreground">solveandcode.com</span>
            </div>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#curriculum" className="hover:text-primary transition-colors">Curriculum</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Solve & Code. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
