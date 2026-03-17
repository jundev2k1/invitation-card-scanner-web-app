import { EventCardStatus } from "@/types";
import { DataType, MappingConfigField } from "./type";

export const EventCardImportConfig = Object.freeze([
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
    matchingKey: 'eventId',
    type: DataType.GUID,
    validate: {
      required: true,
    }
  },
  {
    id: 3,
    matchingKey: 'guestName',
    type: DataType.STRING,
    validate: {
      notEmpty: true,
      maxLength: 255
    }
  },
  {
    id: 4,
    matchingKey: 'isUsed',
    type: DataType.BOOL,
    validate: {
      refer: {
        key: 'firstScannedAt',
        validator: (val: boolean, refVal: Date | null) => (val == true && refVal != null) || (val == false && refVal == null),
        messageFn: (t, val) => t('common.message.required')
      },
    }
  },
  {
    id: 5,
    matchingKey: 'firstScannedAt',
    type: DataType.DATE,
    validate: {
      nullable: true,
      refer: {
        key: 'isUsed',
        validator: (val: Date | null, refVal: boolean) => (refVal == true && val != null) || (refVal == false && val == null),
        messageFn: (t, val) => t('firstScannedAt must be null if isUsed is false')
      },
    }
  },
  {
    id: 6,
    matchingKey: 'status',
    type: DataType.OPTIONS,
    options: [
      { label: 'event.enum.cardStatus.ACTIVE', value: EventCardStatus.ACTIVE },
      { label: 'event.enum.cardStatus.INACTIVE', value: EventCardStatus.INACTIVE },
    ],
    validate: {
      notEmpty: true,
    }
  },
  {
    id: 7,
    matchingKey: 'notes',
    type: DataType.STRING,
    validate: {
      maxLength: 4000
    }
  },
  {
    id: 8,
    matchingKey: 'createdAt',
    type: DataType.DATE,
    validate: {
      updateIgnore: true,
    }
  },
  {
    id: 9,
    matchingKey: 'updatedAt',
    type: DataType.DATE,
  },
] as MappingConfigField[]);
