import { useState, useEffect } from "react";
import { bookingsApi } from "@/lib/bookingsApi";
import type { Booking } from "@/types/booking";
import BookingsTable from "@/components/admin/BookingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>("all");

  const loadBookings = async () => {
    setIsLoading(true);
    try {
      const data = await bookingsApi.getAll();
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.phone.includes(searchTerm)
      );
    }

    // Filter by payment status
    if (paymentStatusFilter !== "all") {
      filtered = filtered.filter(
        (booking) => booking.payment_status === paymentStatusFilter
      );
    }

    // Filter by booking status
    if (bookingStatusFilter !== "all") {
      filtered = filtered.filter(
        (booking) => booking.status === bookingStatusFilter
      );
    }

    setFilteredBookings(filtered);
  }, [searchTerm, paymentStatusFilter, bookingStatusFilter, bookings]);

  const handlePaymentVerification = async (
    bookingId: string,
    status: "verified" | "rejected"
  ) => {
    try {
      await bookingsApi.updatePaymentStatus(bookingId, status);
      toast.success(`Payment ${status} successfully`);
      loadBookings(); // Reload bookings
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold">
                Bookings Admin Panel
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={loadBookings}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Payment Status Filter */}
              <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              {/* Booking Status Filter */}
              <Select value={bookingStatusFilter} onValueChange={setBookingStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Booking Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Booking Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">{bookings.length}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
              <div className="bg-yellow-500/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">
                  {bookings.filter((b) => b.payment_status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Payment</p>
              </div>
              <div className="bg-green-500/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">
                  {bookings.filter((b) => b.payment_status === "verified").length}
                </p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
              <div className="bg-red-500/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">
                  {bookings.filter((b) => b.payment_status === "rejected").length}
                </p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <BookingsTable
          bookings={filteredBookings}
          isLoading={isLoading}
          onPaymentVerification={handlePaymentVerification}
        />
      </div>
    </div>
  );
};

export default Admin;
