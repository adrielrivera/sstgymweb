'use client';

import React, { useState, useEffect } from 'react';
import WeekSelector from '@/components/WeekSelector';
import TimeSlotList from '@/components/TimeSlotList';
import BookingForm from '@/components/BookingForm';
import SuccessModal from '@/components/SuccessModal';
import TermCalendar from '@/components/TermCalendar';
import { TimeSlot, WeekType, getCurrentWeekType, getCurrentWeekNumber } from '@/models/types';
import { getAllTimeSlots, bookSession, getCurrentUser } from '@/services/bookingService';

export default function Home() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedExercisePlan, setSubmittedExercisePlan] = useState('');
  const [bookedTimeSlot, setBookedTimeSlot] = useState<TimeSlot | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // On mount, load the time slots
  useEffect(() => {
    const slots = getAllTimeSlots();
    setTimeSlots(slots);
  }, []);

  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookingSubmit = (exercisePlan: string) => {
    if (selectedTimeSlot) {
      const currentUser = getCurrentUser();
      const booking = bookSession(currentUser.id, selectedTimeSlot.id, exercisePlan);
      
      if (booking) {
        setSubmittedExercisePlan(exercisePlan);
        setBookedTimeSlot(selectedTimeSlot); // Store the time slot for the success modal
        setSelectedTimeSlot(null);
        setShowSuccessModal(true);
        
        // Refresh the time slots to update the counts
        setTimeSlots(getAllTimeSlots());
      } else {
        alert('Failed to book the session. Please try again.');
      }
    }
  };

  const handleBookingCancel = () => {
    setSelectedTimeSlot(null);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setBookedTimeSlot(null);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const currentWeekType = getCurrentWeekType();
  const currentWeekNumber = getCurrentWeekNumber();

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">SST Gym Booking</h1>
        <div className="bg-primary-50 p-4 rounded-lg mb-4 inline-block">
          <p className="text-lg font-medium text-primary-800">
            Current Term: March 24 - May 31, 2024 (10-week term)
          </p>
          <p className="text-md text-primary-700">
            Now in Week {currentWeekNumber} ({currentWeekType === WeekType.ODD ? 'Odd' : 'Even'})
          </p>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Book your gym sessions easily. Choose your preferred time slot, input your exercise plan,
          and don't forget to bring a towel and S&W attire!
        </p>
      </div>

      <WeekSelector 
        currentWeekType={currentWeekType}
        showCalendar={toggleCalendar}
      />
      
      {showCalendar && (
        <TermCalendar
          currentWeekType={currentWeekType}
        />
      )}

      <TimeSlotList
        timeSlots={timeSlots}
        currentWeekType={currentWeekType}
        onSelectTimeSlot={handleSelectTimeSlot}
      />

      {selectedTimeSlot && (
        <BookingForm
          selectedTimeSlot={selectedTimeSlot}
          onSubmit={handleBookingSubmit}
          onCancel={handleBookingCancel}
        />
      )}

      {showSuccessModal && bookedTimeSlot && (
        <SuccessModal
          timeSlot={bookedTimeSlot}
          exercisePlan={submittedExercisePlan}
          onClose={handleSuccessModalClose}
        />
      )}
    </div>
  );
}
