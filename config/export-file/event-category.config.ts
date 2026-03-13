import { ExportConfigField, ExportFieldType } from "./type";

export const EventCategoryExportConfig = Object.freeze([
  {
    matchingKey: 'parentId',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'id',
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
    matchingKey: 'slug',
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
    matchingKey: 'status',
    allowedFormat: [
      ExportFieldType.NUMBER,
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'sortOrder',
    allowedFormat: [
      ExportFieldType.NUMBER,
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
