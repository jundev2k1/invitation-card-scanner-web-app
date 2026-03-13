import { ExportConfigField, ExportFieldType } from "./type";

export const EventExportConfig = Object.freeze([
  {
    matchingKey: 'id',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'cateId',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'cateTitle',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'cateSlug',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'title',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'description',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'startAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
  {
    matchingKey: 'endAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
  {
    matchingKey: 'locationName',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'address',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'mapUrl',
    allowedFormat: [
      ExportFieldType.TEXT,
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
    matchingKey: 'settings',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'createdAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    matchingKey: 'updatedAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
] as ExportConfigField[]);
