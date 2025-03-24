'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  // Handle single-page application routing on GitHub Pages
  useEffect(() => {
    // Check if this is a direct navigation to a page that should exist
    // in our app but doesn't exist as a static file on GitHub Pages
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      
      // Strip base path from the current path
      const relativePath = path.replace(new RegExp(`^${basePath}`), '');
      
      // Check if this is a known route in our application
      // and redirect accordingly
      if (relativePath.startsWith('/') && !relativePath.includes('.')) {
        // This is likely a client-side route, redirect to home page
        router.push('/');
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-8">We couldn&apos;t find the page you&apos;re looking for.</p>
      
      <Link 
        href="/"
        className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition duration-200"
      >
        Return to Home
      </Link>
    </div>
  );
} 