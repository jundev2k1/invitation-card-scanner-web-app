import { EventStatus } from "@/types";
import { DataType, MappingConfigField } from "./type";

export const EventImportConfig = Object.freeze([
  {
    id: 1,
    matchingKey: 'id',
    desc: '',
    type: DataType.GUID,
    validate: {
      required: true,
      unique: true,
    }
  },
  {
    id: 2,
    matchingKey: 'cateId',
    type: DataType.STRING,
    validate: {
      nullable: true,
    }
  },
  {
    id: 3,
    matchingKey: 'title',
    type: DataType.STRING,
    validate: {
      notEmpty: true,
      maxLength: 255
    }
  },
  {
    id: 4,
    matchingKey: 'description',
    type: DataType.STRING,
    validate: {
      maxLength: 4000
    }
  },
  {
    id: 5,
    matchingKey: 'startAt',
    type: DataType.DATE,
    validate: {
      notEmpty: true,
    }
  },
  {
    id: 6,
    matchingKey: 'endAt',
    type: DataType.DATE,
    validate: {
      nullable: true,
      refer: {
        key: 'startAt',
        validator: (val: Date | null, refVal: Date) => !val || val > refVal,
        messageFn: (t, val, rowNum) => t('validate.refer', { field: 'endAt', refField: 'startAt', row: rowNum }),
      },
    }
  },
  {
    id: 7,
    matchingKey: 'locationName',
    type: DataType.STRING,
    validate: {
      notEmpty: true,
      maxLength: 255
    }
  },
  {
    id: 8,
    matchingKey: 'address',
    type: DataType.STRING,
    validate: {
      notEmpty: true,
      maxLength: 255
    }
  },
  {
    id: 9,
    matchingKey: 'mapUrl',
    type: DataType.STRING,
    validate: {
      notEmpty: true,
      maxLength: 255,
      url: true,
    }
  },
  {
    id: 10,
    matchingKey: 'status',
    desc: 'Deleted: 0\nDraft: 1\nPublished: 2\nCompleted: 3\nCancelled: 4',
    type: DataType.OPTIONS,
    options: [
      { label: 'events.enum.status.DELETED', value: EventStatus.DELETED },
      { label: 'events.enum.status.DRAFT', value: EventStatus.DRAFT },
      { label: 'events.enum.status.PUBLISHED', value: EventStatus.PUBLISHED },
      { label: 'events.enum.status.COMPLETED', value: EventStatus.COMPLETED },
      { label: 'events.enum.status.CANCELLED', value: EventStatus.CANCELLED },
    ],
    validate: {
      notEmpty: true,
      maxLength: 255
    }
  },
  {
    id: 11,
    matchingKey: 'settings',
    type: DataType.STRING,
    validate: {
      json: true,
    }
  },
  {
    id: 12,
    matchingKey: 'createdAt',
    type: DataType.DATE,
    validate: {
      updateIgnore: true,
    }
  },
  {
    id: 13,
    matchingKey: 'updatedAt',
    type: DataType.DATE,
  },
] as MappingConfigField[]);
