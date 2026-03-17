import { DataType, MappingConfigField } from "./type";

export const EventCategoryImportConfig = Object.freeze([
  {
    id: 1,
    matchingKey: 'parentId',
    type: DataType.STRING,
    validate: {
      insertIgnore: false,
      updateIgnore: true,
      refer: {
        key: 'id',
        validator: (val: string, refVal: string) => (val === 'ROOT' && refVal.length === 3) || (refVal.length - val.length === 3),
        messageFn: (tGlobal, val) => tGlobal('events.category.ROOT')
      }
    }
  },
  {
    id: 2,
    matchingKey: 'id',
    type: DataType.STRING,
    validate: {
      required: true,
      unique: true,
      refer: {
        key: 'id',
        validator: (val: string, refVal: string) => (val === 'ROOT' && refVal.length === 3) || (refVal.length - val.length === 3),
        messageFn: (tGlobal, val) => tGlobal('events.category.ROOT')
      }
    }
  },
  {
    id: 3,
    matchingKey: 'title',
    type: DataType.STRING,
    validate: {
      notEmpty: true,
      maxLength: 255,
    }
  },
  {
    id: 4,
    matchingKey: 'slug',
    type: DataType.STRING,
    validate: {
      notEmpty: true,
      unique: true,
      maxLength: 255
    }
  },
  {
    id: 5,
    matchingKey: 'description',
    type: DataType.STRING,
    validate: {
      maxLength: 4000,
    }
  },
  {
    id: 6,
    matchingKey: 'status',
    type: DataType.OPTIONS,
    options: [
      { label: 'event.enum.status.ACTIVE', value: 1 },
      { label: 'event.enum.status.INACTIVE', value: 0 },
    ],
    validate: {
      notEmpty: true,
    }
  },
  {
    id: 7,
    matchingKey: 'sortOrder',
    type: DataType.NUMBER,
    validate: {
      notEmpty: true,
    }
  },
  {
    id: 8,
    matchingKey: 'createdAt',
    type: DataType.DATE,
    updateIgnore: true,
  },
  {
    id: 9,
    matchingKey: 'updatedAt',
    type: DataType.DATE,
  },
] as MappingConfigField[]);

export interface EventCategorySearchItemDto {
  parentId: string | 'ROOT';
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  status: number;
  sortOrder: number;
  level: string;
  items: EventCategorySearchItemDto[];
}
