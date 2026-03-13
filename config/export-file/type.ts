export enum ExportFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  PERCENT = 'percent',
  CURRENCY = 'currency',
  DATETIME = 'datetime',
  DATE = 'date',
  TIME = 'time',
  BARCODE = 'barcode',
  QR = 'qr',
  IMAGE = 'image',
  CUSTOM = 'custom',
}

export interface ExportConfigField {
  matchingKey: string;
  allowedFormat: ExportFieldType[];
}
