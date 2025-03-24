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

  if (!isAvailable) {
    statusLabel = 'Full';
    statusClass = 'bg-red-100 text-red-700';
  } else if (!isSufficientSignups) {
    statusLabel = `Need ${5 - timeSlot.currentSignups} more`;
    statusClass = 'bg-yellow-100 text-yellow-700';
  } else {
    statusLabel = 'Available';
    statusClass = 'bg-green-100 text-green-700';
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200 bg-white">
      <div className="px-4 py-5 sm:px-6 border-b bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">{timeSlot.day}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {timeSlot.startTime} - {timeSlot.endTime}
        </p>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">
            {timeSlot.currentSignups} / {timeSlot.maxCapacity} people
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}>
            {statusLabel}
          </span>
        </div>
        <button
          onClick={() => onSelect(timeSlot)}
          disabled={!isAvailable}
          className={`mt-3 w-full inline-flex justify-center rounded-md border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none ${
            isAvailable
              ? 'bg-primary-600 hover:bg-primary-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isAvailable ? 'Book This Slot' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
} 