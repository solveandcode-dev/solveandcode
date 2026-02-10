import type { Booking } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, CheckCircle, XCircle, Download, User, Mail, Phone, Calendar, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PaymentScreenshotModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (status: "verified" | "rejected") => void;
}

const PaymentScreenshotModal = ({ booking, isOpen, onClose, onVerify }: PaymentScreenshotModalProps) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (booking.payment_screenshot) {
      window.open(booking.payment_screenshot, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-2">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-2xl">Payment Screenshot</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Booking Details */}
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Student Name</p>
                  <p className="font-medium">{booking.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{booking.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm">{booking.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Education</p>
                  <p className="font-medium">{booking.education}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Preferred Session</p>
                  <p className="text-sm">{booking.preferred_date}</p>
                  <p className="text-xs text-muted-foreground">{booking.preferred_time}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Payment Status</p>
                <Badge variant="outline" className={
                  booking.payment_status === "verified" 
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : booking.payment_status === "rejected"
                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                }>
                  {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Screenshot */}
          {booking.payment_screenshot ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Payment Screenshot</h3>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="border rounded-lg overflow-hidden bg-white">
                <img
                  src={booking.payment_screenshot}
                  alt="Payment screenshot"
                  className="w-full h-auto max-h-[500px] object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="text-center p-8 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">No payment screenshot uploaded</p>
            </div>
          )}

          {/* Actions */}
          {booking.payment_screenshot && booking.payment_status === "pending" && (
            <div className="flex gap-3 pt-4 border-t">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => onVerify("verified")}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Verify Payment
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => onVerify("rejected")}
              >
                <XCircle className="w-5 h-5 mr-2" />
                Reject Payment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentScreenshotModal;
