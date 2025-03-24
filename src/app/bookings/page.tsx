'use client';

import React, { useState, useEffect } from 'react';
import { Booking, TimeSlot } from '@/models/types';
import { getUserBookings, getTimeSlotById, cancelBooking, getCurrentUser } from '@/services/bookingService';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Array<{ booking: Booking; timeSlot: TimeSlot }>>([]);

  useEffect(() => {
    // Get the current user and their bookings
    const currentUser = getCurrentUser();
    const userBookings = getUserBookings(currentUser.id);
    
    // Get the time slot details for each booking
    const bookingsWithTimeSlots = userBookings.map(booking => {
      const timeSlot = getTimeSlotById(booking.timeSlotId);
      return { booking, timeSlot: timeSlot! };
    });
    
    setBookings(bookingsWithTimeSlots);
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const success = cancelBooking(bookingId);
      
      if (success) {
        // Remove the booking from the state
        setBookings(prevBookings => prevBookings.filter(b => b.booking.id !== bookingId));
      } else {
        alert('Failed to cancel the booking. Please try again.');
      }
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
        <p className="text-lg text-gray-600 mb-8">You don't have any gym sessions booked yet.</p>
        <a 
          href="/"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Book a Session
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map(({ booking, timeSlot }) => (
          <div key={booking.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-primary-50 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {timeSlot.day}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {timeSlot.startTime} - {timeSlot.endTime}
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500">Your Exercise Plan</h4>
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                  {booking.exercisePlan}
                </p>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Current Signups:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    timeSlot.currentSignups >= 5 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {timeSlot.currentSignups} / {timeSlot.maxCapacity}
                  </span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                <p className="text-xs text-yellow-700">
                  <strong>Reminder:</strong> Bring your towel and wear S&W attire.
                </p>
              </div>
              
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="w-full inline-flex justify-center py-2 px-4 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 