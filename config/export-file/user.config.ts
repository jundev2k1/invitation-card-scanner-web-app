import { ExportConfigField, ExportFieldType } from "./type";

export const UserExportConfig = Object.freeze([
  {
    id: 1,
    matchingKey: 'id',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 2,
    matchingKey: 'username',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 3,
    matchingKey: 'email',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 4,
    matchingKey: 'nickName',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    id: 5,
    matchingKey: 'sex',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    id: 6,
    matchingKey: 'phoneNumber',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    id: 7,
    matchingKey: 'bio',
    allowedFormat: [
      ExportFieldType.TEXT,
      ExportFieldType.NUMBER,
    ]
  },
  {
    id: 8,
    matchingKey: 'status',
    allowedFormat: [
      ExportFieldType.NUMBER,
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
