import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { bookingsApi } from '@/lib/bookingsApi';
import type { Booking, BookingStatus } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { LogOut, RefreshCw, Trash2, Edit, Calendar, Users, Clock, CheckCircle, Eye, XCircle as XCircleIcon, Image as ImageIcon } from 'lucide-react';
import EditBookingDialog from '@/components/admin/EditBookingDialog';
import DeleteBookingDialog from '@/components/admin/DeleteBookingDialog';
import PaymentScreenshotModal from '@/components/admin/PaymentScreenshotModal';

const statusColors: Record<BookingStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  completed: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const paymentStatusColors = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  verified: 'bg-green-500/10 text-green-600 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [deletingBooking, setDeletingBooking] = useState<Booking | null>(null);
  const [viewingPayment, setViewingPayment] = useState<Booking | null>(null);
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingsApi.getAll();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleStatusChange = async (id: string, status: BookingStatus) => {
    try {
      await bookingsApi.updateStatus(id, status);
      setBookings(bookings.map(b => 
        b.id === id ? { ...b, status } : b
      ));
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  const handlePaymentVerification = async (id: string, status: 'verified' | 'rejected') => {
    try {
      await bookingsApi.updatePaymentStatus(id, status);
      setBookings(bookings.map(b => 
        b.id === id ? { ...b, payment_status: status, payment_verified_at: status === 'verified' ? new Date().toISOString() : b.payment_verified_at } : b
      ));
      toast.success(`Payment ${status}`);
      setViewingPayment(null);
    } catch (error) {
      toast.error('Failed to update payment status');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await bookingsApi.delete(id);
      setBookings(bookings.filter(b => b.id !== id));
      toast.success('Booking deleted');
      setDeletingBooking(null);
    } catch (error) {
      toast.error('Failed to delete booking');
      console.error(error);
    }
  };

  const handleEdit = async (id: string, data: Partial<Booking>) => {
    try {
      const updated = await bookingsApi.update(id, data);
      setBookings(bookings.map(b => b.id === id ? updated : b));
      toast.success('Booking updated');
      setEditingBooking(null);
    } catch (error) {
      toast.error('Failed to update booking');
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    paymentPending: bookings.filter(b => b.payment_status === 'pending').length,
    paymentVerified: bookings.filter(b => b.payment_status === 'verified').length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gradient">Solve & Code Admin</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={fetchBookings}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Confirmed
              </CardTitle>
              <Calendar className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Payment Pending
              </CardTitle>
              <ImageIcon className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.paymentPending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Payment Verified
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.paymentVerified}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No bookings yet. They will appear here once students book demo classes.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Education</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{booking.email}</div>
                            <div className="text-muted-foreground">{booking.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(booking.preferred_date).toLocaleDateString()}</div>
                            <div className="text-muted-foreground">{booking.preferred_time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.education}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {booking.language === 'hindi' ? 'Hindi' : 'English'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge className={paymentStatusColors[booking.payment_status]} variant="outline">
                              {booking.payment_status}
                            </Badge>
                            {booking.payment_screenshot && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewingPayment(booking)}
                                className="w-full"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            )}
                            {booking.payment_screenshot && booking.payment_status === 'pending' && (
                              <div className="flex gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePaymentVerification(booking.id, 'verified')}
                                  className="text-green-600 hover:text-green-700 flex-1"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePaymentVerification(booking.id, 'rejected')}
                                  className="text-red-600 hover:text-red-700 flex-1"
                                >
                                  <XCircleIcon className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(value) => handleStatusChange(booking.id, value as BookingStatus)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue>
                                <Badge className={statusColors[booking.status]}>
                                  {booking.status}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingBooking(booking)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeletingBooking(booking)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Edit Dialog */}
      {editingBooking && (
        <EditBookingDialog
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
          onSave={handleEdit}
        />
      )}

      {/* Delete Dialog */}
      {deletingBooking && (
        <DeleteBookingDialog
          booking={deletingBooking}
          onClose={() => setDeletingBooking(null)}
          onConfirm={() => handleDelete(deletingBooking.id)}
        />
      )}

      {/* Payment Screenshot Modal */}
      {viewingPayment && (
        <PaymentScreenshotModal
          booking={viewingPayment}
          isOpen={!!viewingPayment}
          onClose={() => setViewingPayment(null)}
          onVerify={(status) => handlePaymentVerification(viewingPayment.id, status)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
