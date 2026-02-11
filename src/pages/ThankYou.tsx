import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CheckCircle2, Home, Mail, Phone, Calendar, Clock, Languages, ArrowRight } from "lucide-react";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract booking details from URL parameters
  const name = searchParams.get("name") || "there";
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const language = searchParams.get("language");

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Thank You, <span className="text-gradient">{name}</span>!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your booking request has been successfully submitted.
            </p>
          </div>

          {/* Booking Details Card */}
          {(email || phone || date || time) && (
            <Card className="mb-8 border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Booking Details</CardTitle>
                <CardDescription>
                  We've received your information and will contact you soon.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {email && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{email}</p>
                    </div>
                  </div>
                )}
                
                {phone && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp Number</p>
                      <p className="font-medium">{phone}</p>
                    </div>
                  </div>
                )}
                
                {date && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Preferred Date</p>
                      <p className="font-medium">{new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                )}
                
                {time && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Clock className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Preferred Time</p>
                      <p className="font-medium">{time}</p>
                    </div>
                  </div>
                )}
                
                {language && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Languages className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Language Preference</p>
                      <p className="font-medium capitalize">{language}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Next Steps Card */}
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="text-2xl">What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Confirmation</h3>
                  <p className="text-muted-foreground text-sm">
                    You'll receive a confirmation email at {email || "your registered email"} within the next few minutes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Personal Contact</h3>
                  <p className="text-muted-foreground text-sm">
                    Our team will reach out to you via WhatsApp or email within 24 hours to confirm your session details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Session Setup</h3>
                  <p className="text-muted-foreground text-sm">
                    We'll send you the meeting link and any preparation materials before your scheduled session.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Start Learning!</h3>
                  <p className="text-muted-foreground text-sm">
                    Join your personalized Python session and begin your coding journey with expert guidance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Note */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> Please check your spam/junk folder if you don't see our email in your inbox. 
                Add us to your contacts to ensure you receive all future communications.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate("/")} 
              className="gradient-primary text-lg h-12 px-8"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/#contact")}
              className="text-lg h-12 px-8"
            >
              Contact Support
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
