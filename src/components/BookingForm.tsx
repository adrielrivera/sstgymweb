'use client';

import React, { useState } from 'react';
import { TimeSlot } from '@/models/types';

interface BookingFormProps {
  selectedTimeSlot: TimeSlot | null;
  onSubmit: (exercisePlan: string) => void;
  onCancel: () => void;
}

export default function BookingForm({ 
  selectedTimeSlot, 
  onSubmit, 
  onCancel 
}: BookingFormProps) {
  const [exercisePlan, setExercisePlan] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!selectedTimeSlot) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!exercisePlan.trim()) {
      alert('Please enter your exercise plan.');
      return;
    }
    
    if (!acceptedTerms) {
      alert('Please accept the terms to book the session.');
      return;
    }
    
    onSubmit(exercisePlan);
    setExercisePlan('');
    setAcceptedTerms(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="bg-primary-50 px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Book Gym Session
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedTimeSlot.day} ({selectedTimeSlot.startTime} - {selectedTimeSlot.endTime})
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="mb-4">
            <label htmlFor="exercisePlan" className="block text-sm font-medium text-gray-700 mb-1">
              Your Exercise Plan
            </label>
            <textarea
              id="exercisePlan"
              name="exercisePlan"
              rows={4}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Describe your exercise plan for this session"
              value={exercisePlan}
              onChange={(e) => setExercisePlan(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Reminder:</strong> Please bring your towel and wear S&W attire for the session.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                  I understand that this session will only proceed if at least 5 students sign up
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Book Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 