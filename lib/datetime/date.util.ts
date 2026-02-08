import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addYears,
  differenceInDays,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
  subDays
} from 'date-fns';
import { vi } from 'date-fns/locale';

export const addSecs = (date: Date, seconds: number) => addSeconds(date, seconds);
export const addMins = (date: Date, minutes: number) => addMinutes(date, minutes);
export const addHrs = (date: Date, hours: number) => addHours(date, hours);
export const addDs = (date: Date, days: number) => addDays(date, days);
export const addMths = (date: Date, months: number) => addMonths(date, months);
export const addYrs = (date: Date, years: number) => addYears(date, years);

export const formatDate = (date: Date, formatStr = 'dd/MM/yyyy') => {
  return format(date, formatStr, { locale: vi });
};

export const getRangeOfDay = (date: Date) => ({
  start: startOfDay(date), // 00:00:00
  end: endOfDay(date)      // 23:59:59
});

export const isFuture = (date: Date) => isAfter(date, new Date());
export const isPast = (date: Date) => isBefore(date, new Date());

export const getDiffDays = (dateLeft: Date, dateRight: Date) => {
  return differenceInDays(dateLeft, dateRight);
};

export const subtractDays = (date: Date, days: number) => subDays(date, days);
