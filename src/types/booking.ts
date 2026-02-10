export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'verified' | 'rejected';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  primary_school: string | null;
  secondary_school: string | null;
  preferred_date: string;
  preferred_time: string;
  language: 'english' | 'hindi';
  goals: string | null;
  status: BookingStatus;
  payment_screenshot: string | null;
  payment_status: PaymentStatus;
  payment_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingInsert {
  name: string;
  email: string;
  phone: string;
  education: string;
  primary_school?: string | null;
  secondary_school?: string | null;
  preferred_date: string;
  preferred_time: string;
  language: 'english' | 'hindi';
  goals?: string | null;
  status?: BookingStatus;
  payment_screenshot?: string | null;
  payment_status?: PaymentStatus;
}

export interface BookingUpdate {
  name?: string;
  email?: string;
  phone?: string;
  education?: string;
  primary_school?: string | null;
  secondary_school?: string | null;
  preferred_date?: string;
  preferred_time?: string;
  language?: 'english' | 'hindi';
  goals?: string | null;
  status?: BookingStatus;
  payment_screenshot?: string | null;
  payment_status?: PaymentStatus;
  payment_verified_at?: string | null;
}
