import { OpeningHour } from '../../../shared/types.js';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export interface CurrentStatus {
  isOpen: boolean;
  message: string;
  nextChange: string;
  period: 'lunch' | 'dinner' | 'closed';
}

export function getLiveRestaurantStatus(hoursList: OpeningHour[]): CurrentStatus {
  if (!hoursList || hoursList.length === 0) {
    return {
      isOpen: false,
      message: 'Hours unavailable',
      nextChange: '',
      period: 'closed',
    };
  }

  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday...
  const todayHours = hoursList.find((h) => h.day_of_week === currentDay);

  if (!todayHours || todayHours.is_closed) {
    return {
      isOpen: false,
      message: 'Closed Today',
      nextChange: 'Opens tomorrow',
      period: 'closed',
    };
  }

  // Parse time helper: "12:00 PM" -> minutes from midnight
  const parseTimeToMinutes = (timeStr: string): number => {
    const [time, modifier] = timeStr.trim().split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + (minutes || 0);
  };

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const lunchOpen = parseTimeToMinutes(todayHours.lunch_open);
  const lunchClose = parseTimeToMinutes(todayHours.lunch_close);
  const dinnerOpen = parseTimeToMinutes(todayHours.dinner_open);
  const dinnerClose = parseTimeToMinutes(todayHours.dinner_close);

  if (currentMinutes >= lunchOpen && currentMinutes < lunchClose) {
    return {
      isOpen: true,
      message: 'Open Now • Lunch Service',
      nextChange: `Lunch closes at ${todayHours.lunch_close}`,
      period: 'lunch',
    };
  } else if (currentMinutes >= lunchClose && currentMinutes < dinnerOpen) {
    return {
      isOpen: false,
      message: 'Closed Between Services',
      nextChange: `Opens for Dinner at ${todayHours.dinner_open}`,
      period: 'closed',
    };
  } else if (currentMinutes >= dinnerOpen && currentMinutes < dinnerClose) {
    return {
      isOpen: true,
      message: 'Open Now • Dinner Service',
      nextChange: `Dinner closes at ${todayHours.dinner_close}`,
      period: 'dinner',
    };
  } else if (currentMinutes < lunchOpen) {
    return {
      isOpen: false,
      message: 'Closed for Morning',
      nextChange: `Opens for Lunch at ${todayHours.lunch_open}`,
      period: 'closed',
    };
  } else {
    return {
      isOpen: false,
      message: 'Closed for the Night',
      nextChange: 'Opens tomorrow at 12:00 PM',
      period: 'closed',
    };
  }
}
