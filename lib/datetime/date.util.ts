export const addSeconds = (date: Date, seconds: number) => {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
}

export const addMinutes = (date: Date, minutes: number) => {
  date.setMinutes(date.getUTCMinutes() + minutes);
  return date;
}

export const addHours = (date: Date, hours: number) => {
  date.setHours(date.getHours() + hours);
  return date;
}

export const addDays = (date: Date, days: number) => {
  date.setDate(date.getDate() + days);
  return date;
}

export const addMonths = (date: Date, months: number) => {
  date.setMonth(date.getMonth() + months);
  return date;
}

export const addYears = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() + years);
  return date;
}
