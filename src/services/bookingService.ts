import { Booking, TimeSlot, User } from '@/models/types';
import { mockTimeSlots, mockBookings, mockUsers } from '@/models/mockData';

// Counter for creating booking IDs
let bookingIdCounter = 1;

// Function to get all time slots
export function getAllTimeSlots(): TimeSlot[] {
  return mockTimeSlots;
}

// Function to get a time slot by ID
export function getTimeSlotById(id: string): TimeSlot | undefined {
  return mockTimeSlots.find(slot => slot.id === id);
}

// Function to book a session
export function bookSession(userId: string, timeSlotId: string, exercisePlan: string): Booking | null {
  // Find the time slot
  const timeSlot = getTimeSlotById(timeSlotId);
  if (!timeSlot) {
    return null;
  }

  // Check if the time slot is available
  if (timeSlot.currentSignups >= timeSlot.maxCapacity) {
    return null;
  }

  // Create a new booking with a static ID pattern
  const booking: Booking = {
    id: `booking-${bookingIdCounter++}`,
    userId,
    timeSlotId,
    exercisePlan,
    createdAt: new Date()
  };

  // Update the time slot's current signups
  timeSlot.currentSignups += 1;

  // Add the booking to the mock data
  mockBookings.push(booking);

  // Update the user's bookings
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    user.bookings.push(booking.id);
  }

  return booking;
}

// Function to get all bookings for a user
export function getUserBookings(userId: string): Booking[] {
  return mockBookings.filter(booking => booking.userId === userId);
}

// Function to get booking details with time slot information
export function getBookingDetails(bookingId: string): { booking: Booking; timeSlot: TimeSlot } | null {
  const booking = mockBookings.find(b => b.id === bookingId);
  if (!booking) {
    return null;
  }

  const timeSlot = getTimeSlotById(booking.timeSlotId);
  if (!timeSlot) {
    return null;
  }

  return { booking, timeSlot };
}

// Function to cancel a booking
export function cancelBooking(bookingId: string): boolean {
  const index = mockBookings.findIndex(b => b.id === bookingId);
  if (index === -1) {
    return false;
  }

  const booking = mockBookings[index];
  
  // Update the time slot's current signups
  const timeSlot = getTimeSlotById(booking.timeSlotId);
  if (timeSlot) {
    timeSlot.currentSignups -= 1;
  }

  // Remove the booking from the user's bookings
  const user = mockUsers.find(u => u.id === booking.userId);
  if (user) {
    const bookingIndex = user.bookings.indexOf(bookingId);
    if (bookingIndex !== -1) {
      user.bookings.splice(bookingIndex, 1);
    }
  }

  // Remove the booking from the mock data
  mockBookings.splice(index, 1);

  return true;
}

// Mock function to get the current user (for demo purposes)
export function getCurrentUser(): User {
  // Return the first user for demonstration
  return mockUsers[0];
} 