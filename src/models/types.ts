// Enum for week type
export enum WeekType {
  ODD = 'odd',
  EVEN = 'even'
}

// Interface for a gym session timeslot
export interface TimeSlot {
  id: string;
  day: string;       // Monday, Tuesday, etc.
  startTime: string; // Format: "HH:MM" (24-hour)
  endTime: string;   // Format: "HH:MM" (24-hour)
  weekType: WeekType;
  maxCapacity: number;
  currentSignups: number;
}

// Interface for a booking
export interface Booking {
  id: string;
  userId: string;
  timeSlotId: string;
  exercisePlan: string;
  createdAt: Date;
}

// Interface for a user
export interface User {
  id: string;
  name: string;
  email: string;
  bookings: string[]; // Array of booking IDs
}

// Interface for term calendar
export interface TermWeek {
  weekNumber: number;
  weekType: WeekType;
  startDate: Date;
  endDate: Date;
}

// Define specific week dates for the term (10 weeks)
const TERM_WEEKS = [
  { start: new Date(2024, 2, 24), end: new Date(2024, 2, 28) }, // Week 1: Mar 24-28
  { start: new Date(2024, 2, 31), end: new Date(2024, 3, 4) },  // Week 2: Mar 31-Apr 4
  { start: new Date(2024, 3, 7), end: new Date(2024, 3, 11) },  // Week 3: Apr 7-11
  { start: new Date(2024, 3, 14), end: new Date(2024, 3, 18) }, // Week 4: Apr 14-18
  { start: new Date(2024, 3, 21), end: new Date(2024, 3, 25) }, // Week 5: Apr 21-25
  { start: new Date(2024, 3, 28), end: new Date(2024, 4, 2) },  // Week 6: Apr 28-May 2
  { start: new Date(2024, 4, 5), end: new Date(2024, 4, 9) },   // Week 7: May 5-9
  { start: new Date(2024, 4, 12), end: new Date(2024, 4, 16) }, // Week 8: May 12-16
  { start: new Date(2024, 4, 19), end: new Date(2024, 4, 23) }, // Week 9: May 19-23
  { start: new Date(2024, 4, 26), end: new Date(2024, 4, 30) }  // Week 10: May 26-30
];

// Get the first day of the term (March 24, 2024)
export function getTermStartDate(): Date {
  return new Date(2024, 2, 24); // Month is 0-indexed (2 = March)
}

// Get the last day of the term (May 30, 2024)
export function getTermEndDate(): Date {
  return new Date(2024, 4, 30); // Month is 0-indexed (4 = May)
}

// Generate calendar for the entire term (10 weeks)
export function generateTermCalendar(): TermWeek[] {
  const calendar: TermWeek[] = [];
  
  for (let weekNum = 0; weekNum < TERM_WEEKS.length; weekNum++) {
    calendar.push({
      weekNumber: weekNum + 1,
      weekType: (weekNum + 1) % 2 === 1 ? WeekType.ODD : WeekType.EVEN,
      startDate: TERM_WEEKS[weekNum].start,
      endDate: TERM_WEEKS[weekNum].end
    });
  }
  
  return calendar;
}

// Helper function to get the current week type based on school calendar
// Week 1 (March 24-28, 2024) is ODD, Week 2 is EVEN, and so on for a 10-week term
export function getCurrentWeekType(): WeekType {
  const weekNumber = getCurrentWeekNumber();
  return weekNumber % 2 === 1 ? WeekType.ODD : WeekType.EVEN;
}

// Helper function to get the current week number (1-10)
export function getCurrentWeekNumber(): number {
  // Use the actual current date for production
  const now = new Date();
  
  // For testing: uncomment this line to force a specific date
  // const now = new Date(2024, 2, 24); // March 24, 2024
  
  // Find which week contains the current date
  for (let i = 0; i < TERM_WEEKS.length; i++) {
    const weekStart = TERM_WEEKS[i].start;
    const weekEnd = TERM_WEEKS[i].end;
    
    // Set time to midnight for proper comparison
    const startCompare = new Date(weekStart);
    startCompare.setHours(0, 0, 0, 0);
    
    const endCompare = new Date(weekEnd);
    endCompare.setHours(23, 59, 59, 999);
    
    const nowCompare = new Date(now);
    nowCompare.setHours(12, 0, 0, 0);
    
    if (nowCompare >= startCompare && nowCompare <= endCompare) {
      return i + 1; // Week numbers are 1-based
    }
  }
  
  // If we're before the term starts, return week 1
  if (now < TERM_WEEKS[0].start) {
    return 1;
  }
  
  // If we're after the term ends, return week 10
  if (now > TERM_WEEKS[TERM_WEEKS.length - 1].end) {
    return 10;
  }
  
  // For dates between defined weeks (like weekends), find the closest week
  for (let i = 0; i < TERM_WEEKS.length - 1; i++) {
    const weekEnd = new Date(TERM_WEEKS[i].end);
    weekEnd.setHours(23, 59, 59, 999);
    
    const nextWeekStart = new Date(TERM_WEEKS[i + 1].start);
    nextWeekStart.setHours(0, 0, 0, 0);
    
    const nowCompare = new Date(now);
    nowCompare.setHours(12, 0, 0, 0);
    
    if (nowCompare > weekEnd && nowCompare < nextWeekStart) {
      // On a weekend or break between defined weeks, return the upcoming week
      return i + 2; // Return the next week number
    }
  }
  
  // Default fallback - should not reach here if dates are defined correctly
  return 1;
}

// Helper function to get the current week details
export function getCurrentWeekDetails(): TermWeek | null {
  const calendar = generateTermCalendar();
  const weekNumber = getCurrentWeekNumber();
  return calendar.find(week => week.weekNumber === weekNumber) || null;
}

// Helper function to format date (DD MMM)
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

// Helper function to format date range (DD-DD MMM)
export function formatDateRange(startDate: Date, endDate: Date): string {
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleDateString('en-US', { month: 'short' })}`;
  } else {
    return `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
  }
}

// Helper function to format time (HH:MM)
export function formatTime(date: Date): string {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
} 