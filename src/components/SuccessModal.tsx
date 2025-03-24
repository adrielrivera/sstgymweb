'use client';

import React from 'react';
import { TimeSlot } from '@/models/types';

interface SuccessModalProps {
  timeSlot: TimeSlot;
  exercisePlan?: string;
  onClose: () => void;
}

export default function SuccessModal({ 
  timeSlot, 
  exercisePlan = 'General fitness and workout', 
  onClose 
}: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        {/* Success header with checkmark */}
        <div className="bg-green-500 p-6 text-center">
          <div className="mx-auto bg-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white">Booking Confirmed!</h3>
        </div>
        
        {/* Booking details */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">Your gym session has been booked:</h4>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span><strong>Day:</strong> {timeSlot.day}</span>
              </div>
              
              <div className="flex">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Time:</strong> {timeSlot.startTime} - {timeSlot.endTime}</span>
              </div>
              
              <div className="flex">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span><strong>Exercise Plan:</strong> {exercisePlan}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 mb-6">
            <div className="flex">
              <svg className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-yellow-700">
                Don't forget to bring your towel and wear proper S&W attire for your gym session!
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
} 