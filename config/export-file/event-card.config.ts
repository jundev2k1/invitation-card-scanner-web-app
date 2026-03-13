import { ExportConfigField, ExportFieldType } from "./type";

export const EventCardExportConfig = Object.freeze([
  {
    matchingKey: 'id',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'eventId',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'eventName',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'startAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    matchingKey: 'endAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    matchingKey: 'guestName',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'accessToken',
    allowedFormat: [
      ExportFieldType.TEXT,
      ExportFieldType.QR,
    ]
  },
  {
    matchingKey: 'isUsed',
    allowedFormat: [
      ExportFieldType.TEXT,
      ExportFieldType.NUMBER,
    ]
  },
  {
    matchingKey: 'firstScannedAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    matchingKey: 'status',
    allowedFormat: [
      ExportFieldType.NUMBER,
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'notes',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'createdAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
  {
    matchingKey: 'updatedAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
] as ExportConfigField[]);
