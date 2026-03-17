import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const useFileUpload = (onFileSelected: (file: File) => Promise<void>) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      await onFileSelected(selectedFile);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  });

  return {
    file,
    setFile,
    getRootProps,
    getInputProps,
    isDragActive,
  };
};
