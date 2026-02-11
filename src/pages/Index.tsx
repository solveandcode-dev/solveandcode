import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
    qrCode: string;
  } | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [currentBookingData, setCurrentBookingData] = useState<{
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    language: string;
  } | null>(null);

  const openBooking = (plan?: { name: string; price: string; qrCode: string }) => {
    if (plan) {
      setSelectedPlan(plan);
    }
    setIsBookingOpen(true);
  };

  const closeBooking = () => setIsBookingOpen(false);

  const handleBookingSuccess = (bookingId: string, bookingData?: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    language: string;
  }) => {
    setCurrentBookingId(bookingId);
    if (bookingData) {
      setCurrentBookingData(bookingData);
    }
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
    
    // Redirect to thank-you page with booking details
    if (currentBookingData) {
      const params = new URLSearchParams(currentBookingData);
      navigate(`/thank-you?${params.toString()}`);
    }
  };

  const closePayment = () => {
    setIsPaymentOpen(false);
    setSelectedPlan(null);
    setCurrentBookingId(null);
    setCurrentBookingData(null);
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
