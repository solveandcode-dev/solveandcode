export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  preferred_date: string;
  preferred_time: string;
  language: 'english' | 'hindi';
  goals: string | null;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface BookingInsert {
  name: string;
  email: string;
  phone: string;
  education: string;
  preferred_date: string;
  preferred_time: string;
  language: 'english' | 'hindi';
  goals?: string | null;
  status?: BookingStatus;
}

export interface BookingUpdate {
  name?: string;
  email?: string;
  phone?: string;
  education?: string;
  preferred_date?: string;
  preferred_time?: string;
  language?: 'english' | 'hindi';
  goals?: string | null;
  status?: BookingStatus;
}
