export enum ExportFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATETIME = 'datetime',
  DATE = 'date',
  TIME = 'time',
  QR = 'qr',
  IMAGE = 'image',
}

export interface ExportConfigField {
  id: number;
  matchingKey: string;
  allowedFormat: ExportFieldType[];
}
