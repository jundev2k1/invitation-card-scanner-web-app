import { ExportConfigField, ExportFieldType } from "./type";

export const EventCardExportConfig = Object.freeze([
  {
    id: 1,
    matchingKey: 'id',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 2,
    matchingKey: 'eventId',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 2,
    matchingKey: 'eventName',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 2,
    matchingKey: 'startAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    id: 2,
    matchingKey: 'endAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    id: 3,
    matchingKey: 'guestName',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 4,
    matchingKey: 'accessToken',
    allowedFormat: [
      ExportFieldType.TEXT,
      ExportFieldType.QR,
    ]
  },
  {
    id: 5,
    matchingKey: 'isUsed',
    allowedFormat: [
      ExportFieldType.TEXT,
      ExportFieldType.NUMBER,
    ]
  },
  {
    id: 6,
    matchingKey: 'firstScannedAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    id: 7,
    matchingKey: 'status',
    allowedFormat: [
      ExportFieldType.NUMBER,
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 8,
    matchingKey: 'notes',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 9,
    matchingKey: 'createdAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
  {
    id: 10,
    matchingKey: 'updatedAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
] as ExportConfigField[]);
