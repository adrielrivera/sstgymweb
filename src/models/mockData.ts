import { TimeSlot, WeekType, Booking, User } from './types';

// Create mock time slots with static IDs instead of dynamic UUID generation
export const mockTimeSlots: TimeSlot[] = [
  // Odd Week Schedule (Week 1, 3, 5, 7, 9)
  {
    id: 'odd-monday-1',
    day: 'Monday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 6
  },
  {
    id: 'odd-monday-2',
    day: 'Monday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 3
  },
  {
    id: 'odd-tuesday-1',
    day: 'Tuesday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 7
  },
  {
    id: 'odd-tuesday-2',
    day: 'Tuesday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 4
  },
  {
    id: 'odd-wednesday-1',
    day: 'Wednesday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 5
  },
  {
    id: 'odd-wednesday-2',
    day: 'Wednesday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 9
  },
  {
    id: 'odd-thursday-1',
    day: 'Thursday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 4
  },
  {
    id: 'odd-thursday-2',
    day: 'Thursday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 8
  },
  {
    id: 'odd-friday-1',
    day: 'Friday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 4
  },
  {
    id: 'odd-friday-2',
    day: 'Friday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.ODD,
    maxCapacity: 15,
    currentSignups: 7
  },

  // Even Week Schedule (Week 2, 4, 6, 8, 10)
  {
    id: 'even-monday-1',
    day: 'Monday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 5
  },
  {
    id: 'even-monday-2',
    day: 'Monday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 8
  },
  {
    id: 'even-tuesday-1',
    day: 'Tuesday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 6
  },
  {
    id: 'even-tuesday-2',
    day: 'Tuesday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 3
  },
  {
    id: 'even-wednesday-1',
    day: 'Wednesday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 10
  },
  {
    id: 'even-wednesday-2',
    day: 'Wednesday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 4
  },
  {
    id: 'even-thursday-1',
    day: 'Thursday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 5
  },
  {
    id: 'even-thursday-2',
    day: 'Thursday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 9
  },
  {
    id: 'even-friday-1',
    day: 'Friday',
    startTime: '07:30',
    endTime: '09:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 6
  },
  {
    id: 'even-friday-2',
    day: 'Friday',
    startTime: '15:30',
    endTime: '17:00',
    weekType: WeekType.EVEN,
    maxCapacity: 15,
    currentSignups: 7
  }
];

// Sample users with static IDs
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    bookings: []
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    bookings: []
  }
];

// Sample bookings (initially empty)
export const mockBookings: Booking[] = []; 