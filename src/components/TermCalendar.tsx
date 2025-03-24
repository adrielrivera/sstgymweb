'use client';

import React from 'react';
import { 
  WeekType, 
  TermWeek, 
  generateTermCalendar, 
  getCurrentWeekNumber, 
  formatDateRange 
} from '@/models/types';

interface TermCalendarProps {
  currentWeekType: WeekType;
}

export default function TermCalendar({ currentWeekType }: TermCalendarProps) {
  const termCalendar = generateTermCalendar();
  const currentWeekNumber = getCurrentWeekNumber();
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Term Calendar</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {termCalendar.map((week: TermWeek) => (
              <tr 
                key={week.weekNumber} 
                className={`${week.weekNumber === currentWeekNumber ? 'bg-primary-50' : ''} 
                           ${week.weekType === currentWeekType ? 'border-l-4 border-primary-500' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Week {week.weekNumber} {week.weekNumber === currentWeekNumber && <span className="text-primary-600 font-bold">(Current)</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    week.weekType === WeekType.ODD 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {week.weekType === WeekType.ODD ? 'Odd' : 'Even'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateRange(week.startDate, week.endDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {week.weekNumber === currentWeekNumber ? (
                    <span className="inline-flex items-center px-2.5 py-1.5 bg-primary-100 text-primary-800 text-xs font-medium rounded">
                      Current Week
                    </span>
                  ) : week.weekNumber < currentWeekNumber ? (
                    <span className="inline-flex items-center px-2.5 py-1.5 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                      Past
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1.5 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                      Upcoming
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 