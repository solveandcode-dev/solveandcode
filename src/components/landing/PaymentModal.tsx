import { X, CheckCircle, Copy, Check, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { uploadPaymentScreenshot } from "@/lib/supabaseStorage";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: string;
  qrCodePath: string;
  bookingId?: string;
  onPaymentConfirm: (screenshotUrl: string) => Promise<void>;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  planName, 
  amount, 
  qrCodePath, 
  bookingId,
  onPaymentConfirm 
}: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const upiId = "irfan93940@oksbi";

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload JPG, PNG, or WebP image.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size too large. Maximum size is 5MB.');
      return;
    }

    setScreenshot(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmPayment = async () => {
    if (!screenshot) {
      toast.error("Please upload payment screenshot before confirming.");
      return;
    }

    if (!bookingId) {
      toast.error("Booking ID not found. Please try again.");
      return;
    }

    setIsUploading(true);
    setPaymentConfirmed(true);

    try {
      // Upload screenshot to Supabase Storage
      const screenshotUrl = await uploadPaymentScreenshot(screenshot, bookingId);
      
      // Call parent callback with screenshot URL
      await onPaymentConfirm(screenshotUrl);
      
      toast.success("Payment screenshot uploaded! We'll verify and contact you soon.", {
        description: "Check your email for confirmation.",
      });
      
      setTimeout(() => {
        setPaymentConfirmed(false);
        setScreenshot(null);
        setScreenshotPreview(null);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Payment confirmation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to upload screenshot. Please try again.");
      setPaymentConfirmed(false);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border-2">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-2xl text-gradient">Complete Payment</CardTitle>
          <CardDescription>
            Scan the QR code below to pay for {planName}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plan Details */}
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-semibold text-lg">{planName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-bold text-2xl text-primary">{amount}</p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img 
                src={qrCodePath} 
                alt={`Payment QR Code for ${planName}`}
                className="w-64 h-64 object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan with any UPI app (GPay, PhonePe, Paytm, etc.)
            </p>
          </div>

          {/* UPI ID */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Or pay using UPI ID:</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                {upiId}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyUPI}
                className="shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Upload Payment Screenshot: <span className="text-red-500">*</span></p>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
              {screenshotPreview ? (
                <div className="space-y-3">
                  <img 
                    src={screenshotPreview} 
                    alt="Payment screenshot preview" 
                    className="max-h-48 mx-auto rounded border"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setScreenshot(null);
                      setScreenshotPreview(null);
                    }}
                  >
                    Change Screenshot
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleScreenshotChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-2 py-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload payment screenshot
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or WebP (max 5MB)
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
            <p className="text-sm font-medium mb-2">Payment Instructions:</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Scan the QR code or use the UPI ID</li>
              <li>Enter the amount: {amount}</li>
              <li>Complete the payment in your UPI app</li>
              <li>Take a screenshot of the payment confirmation</li>
              <li>Upload the screenshot above</li>
              <li>Click "Confirm Payment" button below</li>
            </ol>
          </div>

          {/* Confirm Button */}
          <Button 
            className="w-full gradient-primary text-lg h-12"
            onClick={handleConfirmPayment}
            disabled={paymentConfirmed || isUploading || !screenshot}
          >
            {isUploading ? (
              "Uploading..."
            ) : paymentConfirmed ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Payment Confirmed!
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5 mr-2" />
                Confirm Payment
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            After payment confirmation, we'll verify your screenshot and send you the session details via email/WhatsApp
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;
