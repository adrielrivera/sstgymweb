'use client';

import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-primary-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.24 12.24a6 6 0 0 0-8.49-8.49M5.76 11.76a6 6 0 0 1 8.48 8.48" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 13.5L12 21m-6-6l6-6" />
              </svg>
              <span className="ml-2 text-xl font-semibold text-white">SST Gym Booking</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/" 
                className="text-white hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                href="/bookings" 
                className="text-primary-200 hover:bg-primary-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                My Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 