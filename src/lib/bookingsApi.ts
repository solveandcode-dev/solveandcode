import { supabase } from '@/integrations/supabase/client';
import type { Booking, BookingInsert, BookingUpdate } from '@/types/booking';

export const bookingsApi = {
  async getAll(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Booking[];
  },

  async getById(id: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data as Booking | null;
  },

  async create(booking: BookingInsert): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...booking,
        status: booking.status || 'pending',
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  async update(id: string, booking: BookingUpdate): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        ...booking,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Booking;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async updateStatus(id: string, status: Booking['status']): Promise<Booking> {
    return this.update(id, { status });
  },
};
