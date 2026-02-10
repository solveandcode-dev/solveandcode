import { useState } from "react";
import type { Booking } from "@/types/booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, CheckCircle, XCircle, Calendar, User, Mail, Phone } from "lucide-react";
import PaymentScreenshotModal from "./PaymentScreenshotModal";
import { format } from "date-fns";

interface BookingsTableProps {
  bookings: Booking[];
  isLoading: boolean;
  onPaymentVerification: (bookingId: string, status: "verified" | "rejected") => void;
}

const BookingsTable = ({ bookings, isLoading, onPaymentVerification }: BookingsTableProps) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      verified: "bg-green-500/10 text-green-500 border-green-500/20",
      rejected: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return (
      <Badge className={variants[status as keyof typeof variants] || ""} variant="outline">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getBookingStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      confirmed: "bg-green-500/10 text-green-500 border-green-500/20",
      completed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      cancelled: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return (
      <Badge className={variants[status as keyof typeof variants] || ""} variant="outline">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Loading bookings...</p>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No bookings found</p>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Screenshot</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(booking.created_at), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{booking.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{booking.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{booking.education}</p>
                      {booking.primary_school && (
                        <p className="text-xs text-muted-foreground">
                          Primary: {booking.primary_school}
                        </p>
                      )}
                      {booking.secondary_school && (
                        <p className="text-xs text-muted-foreground">
                          Secondary: {booking.secondary_school}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <div>
                        <p>{booking.preferred_date}</p>
                        <p className="text-xs text-muted-foreground">{booking.preferred_time}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPaymentStatusBadge(booking.payment_status)}</TableCell>
                  <TableCell>{getBookingStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    {booking.payment_screenshot ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">No screenshot</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {booking.payment_screenshot && booking.payment_status === "pending" && (
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onPaymentVerification(booking.id, "verified")}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onPaymentVerification(booking.id, "rejected")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    {booking.payment_status === "verified" && (
                      <span className="text-xs text-green-600">
                        ✓ Verified
                        {booking.payment_verified_at && (
                          <span className="block text-muted-foreground">
                            {format(new Date(booking.payment_verified_at), "MMM dd, HH:mm")}
                          </span>
                        )}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {selectedBooking && (
        <PaymentScreenshotModal
          booking={selectedBooking}
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onVerify={(status) => {
            onPaymentVerification(selectedBooking.id, status);
            setSelectedBooking(null);
          }}
        />
      )}
    </>
  );
};

export default BookingsTable;
