import { ExportConfigField, ExportFieldType } from "./type";

export const EventCategoryExportConfig = Object.freeze([
  {
    id: 1,
    matchingKey: 'parentId',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 2,
    matchingKey: 'id',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 3,
    matchingKey: 'title',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 4,
    matchingKey: 'slug',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 5,
    matchingKey: 'description',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 6,
    matchingKey: 'status',
    allowedFormat: [
      ExportFieldType.NUMBER,
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 7,
    matchingKey: 'sortOrder',
    allowedFormat: [
      ExportFieldType.NUMBER,
    ]
  },
  {
    id: 8,
    matchingKey: 'createdAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
  {
    id: 9,
    matchingKey: 'updatedAt',
    allowedFormat: [
      ExportFieldType.DATETIME,
      ExportFieldType.DATE,
      ExportFieldType.TIME,
    ]
  },
] as ExportConfigField[]);
