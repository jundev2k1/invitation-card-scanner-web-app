import { ExportConfigField, ExportFieldType } from "./type";

export const EventExportConfig = Object.freeze([
  {
    id: 1,
    matchingKey: 'id',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 2,
    matchingKey: 'cateId',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 3,
    matchingKey: 'cateTitle',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 4,
    matchingKey: 'cateSlug',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 5,
    matchingKey: 'name',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 6,
    matchingKey: 'description',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 7,
    matchingKey: 'startAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
  {
    id: 8,
    matchingKey: 'endAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
  {
    id: 9,
    matchingKey: 'locationName',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 10,
    matchingKey: 'address',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 11,
    matchingKey: 'mapUrl',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 12,
    matchingKey: 'status',
    allowedFormat: [
      ExportFieldType.NUMBER,
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 13,
    matchingKey: 'settings',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 14,
    matchingKey: 'createdAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    id: 15,
    matchingKey: 'updatedAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
] as ExportConfigField[]);
