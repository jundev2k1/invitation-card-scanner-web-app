import { ExportFieldType } from "@/root/config/export-file";
import { ImportConfig, ModuleEnum } from "@/root/config/import-file";
import {
  EventCardDto,
  EventCategorySearchItemDto,
  EventDetailDto,
} from "@/types";

export interface ExportColumn {
  id: string;
  matchingKey: EntityKey;
  alias?: string;
  format?: ExportFieldType;
  order: number;
}

export type EntityKey = keyof EventDetailDto
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

export const mockFetchImportConfigs: ImportConfig[] = [
  {
    module: ModuleEnum.EVENTS,
    id: '550e8400-e29b-41d4-a716-446655440000',
    configInfo: {
      name: 'Nhập danh sách sự kiện',
      description: 'Mô tả',
    },
    mappingStep: {
      mappings: [
        { src: 0, dest: 1 },
        { src: 1, dest: 2 },
        { src: 2, dest: 3 },
        { src: 3, dest: 4 },
        { src: 4, dest: 5 },
        { src: 5, dest: 6 },
        { src: 6, dest: 7 },
      ],
      importFields: [],
    },
    uploadStep: {
      name: 'Danh sách sự kiện.xlsx',
      extension: 'xlsx',
      size: 2000000,
      data: [
        ['id', 'categoryId', 'title', 'description', 'startAt', 'endAt', 'createdAt'],
        ['1', '2', '3', '4', '5', '6', '7'],
        ['1', '2', '3', '4', '5', '6', '7'],
        ['1', '2', '3', '4', '5', '6', '7'],
      ]
    },
    rangeStep: {
      rangeStart: 'A2',
      rangeEnd: 'G10',
      autoScaleY: false,
    }
  },
  {
    module: ModuleEnum.EVENT_CATEGORIES,
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    configInfo: {
      name: 'Nhập danh sách danh mục sự kiện',
      description: 'Mô tả',
    },
    mappingStep: {
      mappings: [
        { src: 0, dest: 1 },
        { src: 1, dest: 2 },
        { src: 2, dest: 3 },
        { src: 3, dest: 4 },
        { src: 4, dest: 5 },
        { src: 5, dest: 6 },
      ],
      importFields: [],
    },
    uploadStep: {
      name: 'Danh sách danh mục sự kiện.xlsx',
      extension: 'xlsx',
      size: 5012,
      data: [
        ['id', 'name', 'slug', 'status', 'createdAt'],
        ['1', '2', '3', '4', '5'],
        ['1', '2', '3', '4', '5'],
      ],
    },
    rangeStep: {
      rangeStart: 'A2',
      rangeEnd: 'E2',
      autoScaleY: true,
    }
  },
  {
    module: ModuleEnum.EVENT_CARDS,
    id: '123e4567-e89b-12d3-a456-426614174000',
    configInfo: {
      name: 'Nhập danh sách thẻ sự kiện',
      description: 'Mô tả',
    },
    mappingStep: {
      mappings: [
        { src: 0, dest: 1 },
        { src: 1, dest: 2 },
        { src: 2, dest: 3 },
        { src: 3, dest: 4 },
        { src: 4, dest: 5 },
        { src: 5, dest: 6 },
        { src: 6, dest: 7 },
        { src: 7, dest: 8 },
        { src: 8, dest: 9 },
        { src: 9, dest: 10 },
      ],
      importFields: [],
    },
    uploadStep: {
      name: 'Danh sách thẻ sự kiện.xlsx',
      extension: 'xlsx',
      size: 5012,
      data: [
        ['_action', 'id', 'eventId', 'guestName', 'accessToken', 'isUsed', 'firstScannedAt', 'status', 'notes', 'updatedAt', 'createdAt'],
        ['D', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        ['UI', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      ]
    },
    rangeStep: {
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
