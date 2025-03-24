'use client';

import React from 'react';
import { 
  WeekType, 
  getCurrentWeekDetails,
  formatDateRange
} from '@/models/types';

interface WeekSelectorProps {
  currentWeekType: WeekType;
  showCalendar: () => void;
}

export default function WeekSelector({ 
  currentWeekType,
  showCalendar
}: WeekSelectorProps) {
  const currentWeekDetails = getCurrentWeekDetails();
  
  // Get date range to display for current week
  const dateRangeText = currentWeekDetails 
    ? formatDateRange(currentWeekDetails.startDate, currentWeekDetails.endDate)
    : '';

  // Get week number from current week details
  const weekNumber = currentWeekDetails ? currentWeekDetails.weekNumber : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-100">
      <div className="mb-4 sm:mb-0">
        <h2 className="text-lg font-semibold text-gray-900">
          Week {weekNumber} ({currentWeekType === WeekType.ODD ? 'Odd' : 'Even'})
        </h2>
        <p className="text-sm text-gray-500">{dateRangeText}</p>
      </div>
      
      <div className="flex items-center">
        <div className="inline-flex items-center px-3 py-1.5 border border-primary-300 bg-primary-50 text-sm font-medium rounded text-primary-700 mr-3">
          <span>Booking for {currentWeekType === WeekType.ODD ? 'Odd' : 'Even'} Week</span>
        </div>
        
        <button
          onClick={showCalendar}
          className="inline-flex items-center px-3 py-1.5 border border-primary-300 text-sm font-medium rounded text-primary-700 bg-white hover:bg-primary-50"
        >
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          View Term Calendar
        </button>
      </div>
    </div>
  );
} 