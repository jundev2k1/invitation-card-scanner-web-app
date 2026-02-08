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
    urlSearchParams.append(key, value);
  }
  return urlSearchParams;
};
