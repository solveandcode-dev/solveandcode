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
import PaymentModal from "@/components/landing/PaymentModal";
import { bookingsApi } from "@/lib/bookingsApi";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    qrCode: string;
  } | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);

  const openBooking = (plan?: { name: string; price: string; qrCode: string }) => {
    if (plan) {
      setSelectedPlan(plan);
    }
    setIsBookingOpen(true);
  };

  const closeBooking = () => setIsBookingOpen(false);

  const handleBookingSuccess = (bookingId: string) => {
    setCurrentBookingId(bookingId);
    setIsBookingOpen(false);
    // Open payment modal after booking form submission
    if (selectedPlan) {
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentConfirm = async (screenshotUrl: string) => {
    if (!currentBookingId) {
      throw new Error("No booking ID found");
    }

    // Update booking with payment screenshot
    await bookingsApi.updatePaymentScreenshot(currentBookingId, screenshotUrl);
  };

  const closePayment = () => {
    setIsPaymentOpen(false);
    setSelectedPlan(null);
    setCurrentBookingId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <AudienceSection />
        <CurriculumSection />
        <SessionSection />
        <PricingSection onBookDemo={openBooking} />
        <BenefitsSection />
        <HowItWorksSection onBookDemo={() => openBooking()} />
        <ContactSection />
      </main>
      
      <Footer />
      
      <BookingForm 
        isOpen={isBookingOpen} 
        onClose={closeBooking}
        onSuccess={handleBookingSuccess}
        selectedPlan={selectedPlan}
      />

      {selectedPlan && currentBookingId && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={closePayment}
          planName={selectedPlan.name}
          amount={selectedPlan.price}
          qrCodePath={selectedPlan.qrCode}
          bookingId={currentBookingId}
          onPaymentConfirm={handlePaymentConfirm}
        />
      )}
    </div>
  );
};

export default Index;
