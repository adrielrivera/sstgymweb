'use client';

import React from 'react';
import { TimeSlot } from '@/models/types';

interface TimeSlotCardProps {
  timeSlot: TimeSlot;
  onSelect: (timeSlot: TimeSlot) => void;
}

export default function TimeSlotCard({ timeSlot, onSelect }: TimeSlotCardProps) {
  const isAvailable = timeSlot.currentSignups < timeSlot.maxCapacity;
  const isSufficientSignups = timeSlot.currentSignups >= 5;
  
  let statusLabel = '';
  let statusClass = '';
  let statusIcon = null;

  if (!isAvailable) {
    statusLabel = 'Full';
    statusClass = 'bg-red-100 text-red-700 border-red-200';
    statusIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  } else if (!isSufficientSignups) {
    statusLabel = `Need ${5 - timeSlot.currentSignups} more`;
    statusClass = 'bg-yellow-100 text-yellow-700 border-yellow-200';
    statusIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  } else {
    statusLabel = 'Available';
    statusClass = 'bg-green-100 text-green-700 border-green-200';
    statusIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  // Calculate percentage filled for progress bar
  const percentFilled = Math.round((timeSlot.currentSignups / timeSlot.maxCapacity) * 100);
  let progressColor = "bg-green-500";
  
  if (percentFilled >= 90) {
    progressColor = "bg-red-500";
  } else if (percentFilled >= 70) {
    progressColor = "bg-yellow-500";
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
      {/* Header */}
      <div className="relative px-5 py-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{timeSlot.day}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeSlot.startTime} - {timeSlot.endTime}
            </div>
          </div>

          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusClass}`}>
            {statusIcon}
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Capacity display */}
      <div className="px-5 py-4">
        <div className="flex justify-between mb-1.5">
          <span className="text-sm font-medium text-gray-700">
            Capacity
          </span>
          <span className="text-sm font-medium text-gray-700">
            {timeSlot.currentSignups}/{timeSlot.maxCapacity}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className={`h-2.5 rounded-full ${progressColor} transition-all duration-500`} 
            style={{ width: `${percentFilled}%` }}
          ></div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(timeSlot)}
          disabled={!isAvailable}
          className={`w-full inline-flex justify-center items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200
            ${isAvailable
              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
        >
          {isAvailable ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book This Slot
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fully Booked
            </>
          )}
        </button>
      </div>
    </div>
  );
} 