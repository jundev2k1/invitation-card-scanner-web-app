const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*/;

export function handleDates(data: any): any {
  if (data === null || data === undefined || typeof data !== 'object')
    return data;

  for (const key of Object.keys(data)) {
    const value = data[key];
    if (typeof value === 'string' && isoDateFormat.test(value)) {
      data[key] = new Date(value);
    } else if (typeof value === 'object') {
      handleDates(value);
    }
  }
  return data;
}

export const mapToFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }
  return formData;
};

export const mapToUrlSearchParams = (data: Record<string, any>) => {
  const urlSearchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        urlSearchParams.append(key, item);
      }
      continue;
    }

    urlSearchParams.append(key, value);
  }
  return urlSearchParams;
};
