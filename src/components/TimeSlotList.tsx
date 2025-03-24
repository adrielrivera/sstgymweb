'use client';

import React from 'react';
import { TimeSlot, WeekType } from '@/models/types';
import TimeSlotCard from './TimeSlotCard';

interface TimeSlotListProps {
  timeSlots: TimeSlot[];
  currentWeekType: WeekType;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

// Day icon mapping for visual enhancement
const dayIcons: Record<string, React.ReactNode> = {
  "Monday": (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  ),
  "Tuesday": (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5v14M18 9v6M6 9h12M6 15h12" />
    </svg>
  ),
  "Wednesday": (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "Thursday": (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "Friday": (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
};

export default function TimeSlotList({ 
  timeSlots, 
  currentWeekType,
  onSelectTimeSlot
}: TimeSlotListProps) {
  // Filter time slots by the current week type
  const filteredTimeSlots = timeSlots.filter(
    (timeSlot) => timeSlot.weekType === currentWeekType
  );

  // Group time slots by day
  const timeSlotsByDay = filteredTimeSlots.reduce<Record<string, TimeSlot[]>>(
    (acc, timeSlot) => {
      const { day } = timeSlot;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(timeSlot);
      return acc;
    },
    {}
  );

  // Sort time slots within each day by start time
  Object.keys(timeSlotsByDay).forEach(day => {
    timeSlotsByDay[day].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
  });

  // Order of days
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Sort days
  const sortedDays = Object.keys(timeSlotsByDay).sort(
    (a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
  );

  if (filteredTimeSlots.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500 text-lg">No time slots available for the current week.</p>
      </div>
    );
  }

  return (
    <div>
      {sortedDays.map((day) => (
        <div key={day} className="mb-10">
          <div className="flex items-center mb-5">
            <div className="mr-3">{dayIcons[day]}</div>
            <h2 className="text-xl font-bold text-gray-800">{day}</h2>
            <div className="ml-3 h-px bg-gray-200 flex-grow"></div> {/* Line divider */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeSlotsByDay[day].map((timeSlot) => (
              <TimeSlotCard 
                key={timeSlot.id} 
                timeSlot={timeSlot} 
                onSelect={onSelectTimeSlot} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 