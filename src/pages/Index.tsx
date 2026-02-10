import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import AudienceSection from "@/components/landing/AudienceSection";
import CurriculumSection from "@/components/landing/CurriculumSection";
import SessionSection from "@/components/landing/SessionSection";
import PricingSection from "@/components/landing/PricingSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import BookingForm from "@/components/landing/BookingForm";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookDemo={openBooking} />
      
      <main className="pt-16">
        <HeroSection onBookDemo={openBooking} />
        <AboutSection />
        <AudienceSection />
        <CurriculumSection />
        <SessionSection />
        <PricingSection onBookDemo={openBooking} />
        <BenefitsSection />
        <HowItWorksSection onBookDemo={openBooking} />
        <ContactSection />
      </main>
      
      <Footer />
      
      <BookingForm isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
};

export default Index;
