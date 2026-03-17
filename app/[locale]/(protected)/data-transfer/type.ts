import { ExportFieldType } from "@/root/config/export-file";
import { ImportConfig, ModuleEnum } from "@/root/config/import-file";
import { ExportConfig } from "./_elements/export/setting/exportSettings.type";

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
      columnRow: 0,
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
      columnRow: 0,
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
      columnRow: 0,
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
      { matchingKey: 'id', alias: 'ID', order: 0, format: ExportFieldType.TEXT },
      { matchingKey: 'cateId', alias: 'ID danh mục', order: 1, format: ExportFieldType.TEXT },
      { matchingKey: 'cateTitle', alias: 'Tiêu đề danh mục', order: 1, format: ExportFieldType.TEXT },
      { matchingKey: 'cateSlug', alias: 'Slug danh mục', order: 1, format: ExportFieldType.TEXT },
      { matchingKey: 'name', alias: 'Tiêu đề', order: 2, format: ExportFieldType.TEXT },
      { matchingKey: 'description', order: 3, format: ExportFieldType.TEXT },
      { matchingKey: 'startAt', order: 4, format: ExportFieldType.DATETIME },
      { matchingKey: 'endAt', order: 5, format: ExportFieldType.DATETIME },
      { matchingKey: 'location', order: 4, format: ExportFieldType.TEXT },
      { matchingKey: 'address', order: 5, format: ExportFieldType.TEXT },
      { matchingKey: 'mapUrl', order: 5, format: ExportFieldType.TEXT },
      { matchingKey: 'status', order: 6, format: ExportFieldType.NUMBER },
      { matchingKey: 'createdAt', order: 6, format: ExportFieldType.DATETIME },
      { matchingKey: 'updatedAt', order: 7, format: ExportFieldType.DATETIME },
    ]
  },
  {
    module: ModuleEnum.EVENT_CARDS,
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Xuất danh sách thẻ sự kiện',
    columns: [
      { matchingKey: 'id', alias: 'ID', order: 0, format: ExportFieldType.TEXT },
      { matchingKey: 'eventId', alias: 'ID sự kiện', order: 1, format: ExportFieldType.TEXT },
      { matchingKey: 'guestName', order: 2, format: ExportFieldType.TEXT },
      { matchingKey: 'accessToken', order: 3, format: ExportFieldType.QR },
      { matchingKey: 'isUsed', order: 4, format: ExportFieldType.TEXT },
      { matchingKey: 'firstScannedAt', order: 5, format: ExportFieldType.DATETIME },
      { matchingKey: 'status', order: 6, format: ExportFieldType.NUMBER },
      { matchingKey: 'notes', order: 7, format: ExportFieldType.TEXT },
      { matchingKey: 'updatedAt', order: 8, format: ExportFieldType.DATETIME },
      { matchingKey: 'createdAt', order: 9, format: ExportFieldType.DATETIME },
    ]
  },
  {
    module: ModuleEnum.EVENT_CATEGORIES,
    id: 'fedcba98-7654-3210-9876-543210fedcba',
    name: 'Xuất danh sách danh mục sự kiện',
    columns: [
      { matchingKey: 'id', alias: 'ID', order: 0, format: ExportFieldType.TEXT },
      { matchingKey: 'parentId', alias: 'ID sự kiện', order: 1, format: ExportFieldType.TEXT },
      { matchingKey: 'name', order: 2, format: ExportFieldType.TEXT },
      { matchingKey: 'slug', order: 3, format: ExportFieldType.TEXT },
      { matchingKey: 'status', order: 4, format: ExportFieldType.NUMBER },
      { matchingKey: 'createdAt', order: 5, format: ExportFieldType.DATETIME },
    ]
  }
];
