'use client';

import React from 'react';
import { TimeSlot } from '@/models/types';

interface SuccessModalProps {
  timeSlot: TimeSlot;
  exercisePlan: string;
  onClose: () => void;
}

export default function SuccessModal({ 
  timeSlot, 
  exercisePlan, 
  onClose 
}: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="bg-green-50 px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="ml-3 text-lg font-medium leading-6 text-gray-900">
              Booking Successful!
            </h3>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500">Session Details</h4>
            <p className="mt-1 text-base font-semibold text-gray-900">
              {timeSlot.day} ({timeSlot.startTime} - {timeSlot.endTime})
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500">Your Exercise Plan</h4>
            <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
              {exercisePlan}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Reminder:</strong> This session will only proceed if at least 5 students sign up. Don't forget to bring your towel and wear S&W attire.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 