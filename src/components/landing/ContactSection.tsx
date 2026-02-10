import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, Clock, Send } from "lucide-react";

const ContactSection = () => {
  // Replace with actual WhatsApp number
  const whatsappNumber = "919059409980";
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in learning Python. Can you share more details about the course?");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? Reach out anytime - I'm here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* WhatsApp Card */}
          <Card className="border-2 border-green-500/20 hover:border-green-500/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-green-500/10">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground mb-4">
                    Quick questions? Send a message on WhatsApp for instant responses.
                  </p>
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    asChild
                  >
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-primary/10">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">Email</h3>
                  <p className="text-muted-foreground mb-4">
                    For detailed inquiries or questions about the curriculum.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="mailto:info.solveandcode@gmail.com?subject=Python Course Inquiry">
                      <Send className="w-4 h-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Availability */}
        <div className="max-w-xl mx-auto mt-8">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 justify-center">
                <Clock className="w-5 h-5 text-accent" />
                <div className="text-center">
                  <p className="font-medium">Available Hours</p>
                  <p className="text-muted-foreground text-sm">
                    Monday - Saturday: 9:00 AM - 9:00 PM IST
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Response time: Within 2-4 hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
