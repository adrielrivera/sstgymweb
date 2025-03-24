'use client';

import React from 'react';
import { 
  WeekType, 
  getCurrentWeekDetails,
  formatDateRange
} from '@/models/types';

interface WeekSelectorProps {
  currentWeekType: WeekType;
  onWeekTypeChange: (weekType: WeekType) => void;
  showCalendar: () => void;
}

export default function WeekSelector({ 
  currentWeekType,
  onWeekTypeChange,
  showCalendar
}: WeekSelectorProps) {
  const currentWeek = getCurrentWeekDetails();
  
  // Get date range to display for current week
  const dateRange = currentWeek ? formatDateRange(currentWeek.startDate, currentWeek.endDate) : '';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Current week indicator with gradient based on week type */}
      <div className={`h-2 ${currentWeekType === WeekType.ODD ? 'bg-gradient-to-r from-indigo-400 to-indigo-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'}`}></div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center mb-2">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                currentWeekType === WeekType.ODD 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-amber-100 text-amber-700'
              } mr-3 font-bold`}>
                {currentWeek?.weekNumber || '-'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentWeekType === WeekType.ODD ? 'Odd Week' : 'Even Week'}
                </h2>
                {currentWeek && currentWeek.weekType === currentWeekType && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Current
                  </span>
                )}
              </div>
            </div>
            {dateRange && (
              <p className="text-gray-600 text-sm mt-1">
                {dateRange}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onWeekTypeChange(WeekType.ODD)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentWeekType === WeekType.ODD
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Odd Weeks
            </button>
            <button
              onClick={() => onWeekTypeChange(WeekType.EVEN)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentWeekType === WeekType.EVEN
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Even Weeks
            </button>
            <button
              onClick={showCalendar}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 