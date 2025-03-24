'use client';

import React from 'react';
import { generateTermCalendar, getCurrentWeekDetails, formatDateRange } from '@/models/types';

interface TermCalendarProps {
  onClose: () => void;
}

export default function TermCalendar({ onClose }: TermCalendarProps) {
  const calendar = generateTermCalendar();
  const currentWeek = getCurrentWeekDetails();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Term Calendar</h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Calendar content */}
        <div className="overflow-auto p-6 flex-grow">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-blue-800">
                Currently in <span className="font-semibold">Week {currentWeek.weekNumber}</span>: {formatDateRange(currentWeek.startDate, currentWeek.endDate)}
              </p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calendar.map((week) => {
                  const isCurrentWeek = week.weekNumber === currentWeek.weekNumber;
                  
                  return (
                    <tr 
                      key={week.weekNumber}
                      className={`${isCurrentWeek ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'} transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${week.weekType === 'odd' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'}`}>
                            {week.weekNumber}
                          </div>
                          {isCurrentWeek && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Current
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${week.weekType === 'odd' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}`}>
                          {week.weekType === 'odd' ? 'Odd' : 'Even'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatDateRange(week.startDate, week.endDate)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button 
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Close Calendar
          </button>
        </div>
      </div>
    </div>
  );
} 