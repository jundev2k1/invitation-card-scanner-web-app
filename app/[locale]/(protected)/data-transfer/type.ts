import {
  EventCardDto,
  EventCategorySearchItemDto,
  EventDetailDto,
} from "@/types";

export enum ModuleEnum {
  EVENT_CATEGORIES = 0,
  EVENTS = 1,
  EVENT_CARDS = 2
}

enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
  QR = 'qr',
  BARCODE = 'barcode',
  IMAGE = 'image',
  COMPUTED = 'computed'
}

export interface ExportColumn {
  id: string;
  matchingKey: EntityKey;
  alias?: string;
  format?: FieldType;
  order: number;
}

type EntityKey = keyof EventDetailDto
  | keyof EventCategorySearchItemDto
  | keyof EventCardDto;

export interface ColumnConfig<T> {
  key: keyof T | string;
  required?: boolean;
}

export interface ExportConfig {
  module: ModuleEnum;
  id: string;
  name: string;
  description?: string;
  includesActionColumn?: boolean;
  columns: ExportColumn[];
}

export interface ImportColumn {
  matchingKey: EntityKey;
  id: string;
  order: number;
  alias?: string;
  ignore?: boolean;
  required?: boolean;
}

export interface ImportTemplate {
  name: string;
  extension?: string;
  data: string[][];
}

export interface ImportRange {
  rangeStart?: string | null;
  rangeEnd?: string | null;
  autoScaleY?: boolean;
}

export interface ImportFileTemplate {
  name: string;
  extension: 'csv' | 'xlsx' | 'xls';
  data: string[][];
}

export interface ImportConfig {
  module: ModuleEnum;
  id: string | undefined;
  name: string;
  description?: string;
  fileTemplate?: ImportFileTemplate | null;
  range?: ImportRange | null;
  columns: ImportColumn[];
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export type SelectModuleChangeFn = (
  setting: ImportConfig | ExportConfig | null
) => void;

export const mockAvailableFields: ExportColumn[] = [
  { id: '1', matchingKey: 'id', format: FieldType.TEXT, alias: 'ID', order: 0 },
  { id: '2', matchingKey: 'title', format: FieldType.TEXT, alias: 'Tiêu đề', order: 1 },
  { id: '3', matchingKey: 'description', format: FieldType.TEXT, order: 2 },
  { id: '4', matchingKey: 'startAt', format: FieldType.DATETIME, order: 3 },
  { id: '5', matchingKey: 'endAt', format: FieldType.DATETIME, order: 4 },
  { id: '6', matchingKey: 'createdAt', format: FieldType.DATETIME, order: 5 },
];

type ModuleDtoMap = {
  [ModuleEnum.EVENT_CATEGORIES]: EventCategorySearchItemDto,
  [ModuleEnum.EVENTS]: EventDetailDto,
  [ModuleEnum.EVENT_CARDS]: EventCardDto,
}

type ColumnConfigType = {
  [K in keyof ModuleDtoMap]: {
    key: keyof ModuleDtoMap[K];
    required?: boolean;
    ignore?: boolean;
  }[];
};

export const columnConfigs: ColumnConfigType = {
  [ModuleEnum.EVENT_CATEGORIES]: [
    { key: 'parentId' },
    { key: 'id', required: true },
    { key: 'name' },
    { key: 'slug' },
    { key: 'description' },
    { key: 'imageUrl' },
    { key: 'status' },
    { key: 'sortOrder' },
    { key: 'level' },
  ],
  [ModuleEnum.EVENTS]: [
    { key: 'id', required: true },
    { key: 'categoryId' },
    { key: 'status' },
    { key: 'title' },
    { key: 'description' },
    { key: 'startAt' },
    { key: 'endAt' },
    { key: 'createdAt' },
    { key: 'updatedAt' },
  ],
  [ModuleEnum.EVENT_CARDS]: [
    { key: 'id', required: true },
    { key: 'eventId' },
    { key: 'guestName' },
    { key: 'accessToken' },
    { key: 'isUsed' },
    { key: 'firstScannedAt' },
    { key: 'status' },
    { key: 'notes' },
    { key: 'updatedAt' },
    { key: 'createdAt' },
  ]
};

export const mockFetchImportConfigs: ImportConfig[] = [
  {
    module: ModuleEnum.EVENTS,
    id: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Nhập danh sách sự kiện',
    columns: [
      { id: '550e8400-e29b-41d4-a716-446655440001', matchingKey: 'id', alias: 'ID', order: 0 },
      { id: '550e8400-e29b-41d4-a716-446655440002', matchingKey: 'categoryId', alias: 'ID danh sách', order: 1 },
      { id: '550e8400-e29b-41d4-a716-446655440003', matchingKey: 'title', alias: 'Tiêu đề', order: 2 },
      { id: '550e8400-e29b-41d4-a716-446655440004', matchingKey: 'description', order: 3 },
      { id: '550e8400-e29b-41d4-a716-446655440005', matchingKey: 'startAt', order: 4 },
      { id: '550e8400-e29b-41d4-a716-446655440006', matchingKey: 'endAt', order: 5 },
      { id: '550e8400-e29b-41d4-a716-446655440007', matchingKey: 'createdAt', order: 6 },
    ],
    fileTemplate: {
      name: 'Danh sách sự kiện.xlsx',
      extension: 'xlsx',
      data: [
        ['id', 'categoryId', 'title', 'description', 'startAt', 'endAt', 'createdAt'],
        ['1', '2', '3', '4', '5', '6', '7'],
        ['1', '2', '3', '4', '5', '6', '7'],
        ['1', '2', '3', '4', '5', '6', '7'],
      ]
    },
    range: {
      rangeStart: 'A2',
      rangeEnd: 'G10',
      autoScaleY: false,
    }
  },
  {
    module: ModuleEnum.EVENT_CATEGORIES,
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    name: 'Nhập danh sách danh mục sự kiện',
    description: 'Mô tả',
    columns: [
      { id: '6ba7b810-9dad-11d1-80b4-00c04fd430c9', matchingKey: 'parentId', alias: 'ID', order: 0, ignore: true },
      { id: '6ba7b810-9dad-11d1-80b4-00c04fd430ca', matchingKey: 'id', alias: 'Tiêu đề', order: 1, required: true },
      { id: '6ba7b810-9dad-11d1-80b4-00c04fd430cb', matchingKey: 'name', order: 2 },
      { id: '6ba7b810-9dad-11d1-80b4-00c04fd430cc', matchingKey: 'slug', order: 3 },
      { id: '6ba7b810-9dad-11d1-80b4-00c04fd430cd', matchingKey: 'status', order: 4 },
      { id: '6ba7b810-9dad-11d1-80b4-00c04fd430ce', matchingKey: 'createdAt', order: 5 },
    ],
    fileTemplate: {
      name: 'Danh sách danh mục sự kiện.xlsx',
      extension: 'xlsx',
      data: [
        ['id', 'name', 'slug', 'status', 'createdAt'],
        ['1', '2', '3', '4', '5'],
        ['1', '2', '3', '4', '5'],
      ],
    },
    range: {
      rangeStart: 'A2',
      rangeEnd: 'E2',
      autoScaleY: true,
    }
  },
  {
    module: ModuleEnum.EVENT_CARDS,
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Nhập danh sách thẻ sự kiện',
    description: 'Mô tả',
    columns: [
      { id: '123e4567-e89b-12d3-a456-426614174001', matchingKey: 'id', alias: 'as ID', order: 0 },
      { id: '123e4567-e89b-12d3-a456-426614174002', matchingKey: 'eventId', alias: 'as Event ID', order: 1 },
      { id: '123e4567-e89b-12d3-a456-426614174003', matchingKey: 'guestName', order: 2 },
      { id: '123e4567-e89b-12d3-a456-426614174004', matchingKey: 'accessToken', order: 3 },
      { id: '123e4567-e89b-12d3-a456-426614174005', matchingKey: 'isUsed', order: 4 },
      { id: '123e4567-e89b-12d3-a456-426614174006', matchingKey: 'firstScannedAt', order: 5 },
      { id: '123e4567-e89b-12d3-a456-426614174007', matchingKey: 'status', order: 6 },
      { id: '123e4567-e89b-12d3-a456-426614174008', matchingKey: 'notes', order: 7 },
      { id: '123e4567-e89b-12d3-a456-426614174009', matchingKey: 'updatedAt', order: 8 },
      { id: '123e4567-e89b-12d3-a456-42661417400a', matchingKey: 'createdAt', order: 9 },
    ],
    fileTemplate: {
      name: 'Danh sách thẻ sự kiện.xlsx',
      extension: 'xlsx',
      data: [
        ['_action', 'id', 'eventId', 'guestName', 'accessToken', 'isUsed', 'firstScannedAt', 'status', 'notes', 'updatedAt', 'createdAt'],
        ['D', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        ['UI', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      ]
    },
    range: {
      rangeStart: 'A2',
      rangeEnd: 'K2',
      autoScaleY: true,
    },
    updatedAt: new Date('2023-01-01T00:00:00.000Z'),
    createdAt: new Date('2023-01-01T00:00:00.000Z')
  }
];

export const mockFetchExportConfigs: ExportConfig[] = [
  {
    module: ModuleEnum.EVENTS,
    id: '987fcdeb-1234-5678-9abc-def012345678',
    name: 'Xuất danh sách sự kiện',
    columns: [
      { id: '987fcdeb-1234-5678-9abc-def012345679', matchingKey: 'id', alias: 'ID', order: 0 },
      { id: '987fcdeb-1234-5678-9abc-def01234567a', matchingKey: 'categoryId', alias: 'ID danh sách', order: 1 },
      { id: '987fcdeb-1234-5678-9abc-def01234567b', matchingKey: 'title', alias: 'Tiêu đề', order: 2 },
      { id: '987fcdeb-1234-5678-9abc-def01234567c', matchingKey: 'description', order: 3 },
      { id: '987fcdeb-1234-5678-9abc-def01234567d', matchingKey: 'startAt', order: 4 },
      { id: '987fcdeb-1234-5678-9abc-def01234567e', matchingKey: 'endAt', order: 5 },
      { id: '987fcdeb-1234-5678-9abc-def01234567f', matchingKey: 'createdAt', order: 6 },
    ]
  },
  {
    module: ModuleEnum.EVENT_CARDS,
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Xuất danh sách thẻ sự kiện',
    columns: [
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891', matchingKey: 'id', alias: 'ID', order: 0 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567892', matchingKey: 'eventId', alias: 'ID sự kiện', order: 1 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567893', matchingKey: 'guestName', order: 2 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567894', matchingKey: 'accessToken', order: 3 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567895', matchingKey: 'isUsed', order: 4 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567896', matchingKey: 'firstScannedAt', order: 5 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567897', matchingKey: 'status', order: 6 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567898', matchingKey: 'notes', order: 7 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567899', matchingKey: 'updatedAt', order: 8 },
      { id: 'a1b2c3d4-e5f6-7890-abcd-ef123456789a', matchingKey: 'createdAt', order: 9 },
    ]
  },
  {
    module: ModuleEnum.EVENT_CATEGORIES,
    id: 'fedcba98-7654-3210-9876-543210fedcba',
    name: 'Xuất danh sách danh mục sự kiện',
    columns: [
      { id: 'fedcba98-7654-3210-9876-543210fedcb1', matchingKey: 'id', alias: 'ID', order: 0 },
      { id: 'fedcba98-7654-3210-9876-543210fedcb2', matchingKey: 'parentId', alias: 'ID sự kiện', order: 1 },
      { id: 'fedcba98-7654-3210-9876-543210fedcb3', matchingKey: 'name', order: 2 },
      { id: 'fedcba98-7654-3210-9876-543210fedcb4', matchingKey: 'slug', order: 3 },
      { id: 'fedcba98-7654-3210-9876-543210fedcb5', matchingKey: 'status', order: 4 },
      { id: 'fedcba98-7654-3210-9876-543210fedcb6', matchingKey: 'createdAt', order: 5 },
    ]
  }
];
