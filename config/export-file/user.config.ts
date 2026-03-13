import { ExportConfigField, ExportFieldType } from "./type";

export const UserExportConfig = Object.freeze([
  {
    matchingKey: 'id',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'username',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'email',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'nickName',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    matchingKey: 'sex',
    allowedFormat: [
      ExportFieldType.DATETIME,
    ]
  },
  {
    matchingKey: 'phoneNumber',
    allowedFormat: [
      ExportFieldType.TEXT,
    ]
  },
  {
    matchingKey: 'bio',
    allowedFormat: [
      ExportFieldType.TEXT,
      ExportFieldType.NUMBER,
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
