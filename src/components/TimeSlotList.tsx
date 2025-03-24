'use client';

import React from 'react';
import { TimeSlot, WeekType } from '@/models/types';
import TimeSlotCard from './TimeSlotCard';

interface TimeSlotListProps {
  timeSlots: TimeSlot[];
  currentWeekType: WeekType;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}

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
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No time slots available for the current week.</p>
      </div>
    );
  }

  return (
    <div>
      {sortedDays.map((day) => (
        <div key={day} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{day}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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