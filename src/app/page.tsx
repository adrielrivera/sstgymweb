'use client';

import React, { useState, useEffect } from 'react';
import WeekSelector from '@/components/WeekSelector';
import TimeSlotList from '@/components/TimeSlotList';
import BookingForm from '@/components/BookingForm';
import SuccessModal from '@/components/SuccessModal';
import TermCalendar from '@/components/TermCalendar';
import { TimeSlot, WeekType, getCurrentWeekType, getCurrentWeekNumber } from '@/models/types';
import { getAllTimeSlots, bookSession, getCurrentUser } from '@/services/bookingService';
import { mockTimeSlots } from '@/models/mockData';
import Footer from '@/components/Footer';

export default function Home() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedExercisePlan, setSubmittedExercisePlan] = useState('');
  const [bookedTimeSlot, setBookedTimeSlot] = useState<TimeSlot | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWeekType, setCurrentWeekType] = useState<WeekType>(getCurrentWeekType());
  
  // On mount, load the time slots and set loaded state for animation
  useEffect(() => {
    const slots = getAllTimeSlots();
    setTimeSlots(slots);
    
    // Delay the loaded state slightly for a fade-in effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleWeekTypeChange = (weekType: WeekType) => {
    setCurrentWeekType(weekType);
  };

  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    // Scroll to the booking form smoothly
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

  const currentWeekNumber = getCurrentWeekNumber();

  return (
    <div className="flex flex-col min-h-screen">
      <main className={`flex-grow bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg p-8 mb-8">
            {/* Abstract Background Pattern */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-100 rounded-full opacity-50"></div>
            
            <div className="relative">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                SST Gym Booking
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Book your gym sessions easily. Check availability across odd and even weeks, and secure your spot today.
              </p>
            </div>
          </div>

          <WeekSelector 
            currentWeekType={currentWeekType} 
            onWeekTypeChange={handleWeekTypeChange} 
            showCalendar={toggleCalendar}
          />

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Time Slots</h2>
            <TimeSlotList 
              timeSlots={timeSlots} 
              currentWeekType={currentWeekType}
              onSelectTimeSlot={handleSelectTimeSlot}
            />
          </div>
        </div>

        {showSuccessModal && selectedTimeSlot && (
          <SuccessModal 
            timeSlot={selectedTimeSlot} 
            onClose={handleSuccessModalClose} 
          />
        )}

        {showCalendar && (
          <TermCalendar onClose={toggleCalendar} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
