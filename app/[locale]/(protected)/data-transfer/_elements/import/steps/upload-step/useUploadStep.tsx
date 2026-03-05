import { useCallback, useState } from 'react';

export const useUploadStep = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  return {
    file,
    handleFileChange,
  };
};
