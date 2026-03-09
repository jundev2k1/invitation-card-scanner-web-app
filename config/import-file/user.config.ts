import { Sex, UserStatus } from "@/root/types";
import { DataType, MappingConfigField } from "./type";

export const UserImportConfig = Object.freeze([
  {
    id: 1,
    matchingKey: 'id',
    desc: '',
    type: DataType.GUID,
    validate: {
      required: true,
    }
  },
  {
    id: 2,
    matchingKey: 'username',
    type: DataType.STRING,
    validate: {
      required: true,
      minLength: 6,
      maxLength: 50
    }
  },
  {
    id: 3,
    matchingKey: 'email',
    type: DataType.EMAIL,
    validate: {
      required: true,
      maxLength: 50,
    }
  },
  {
    id: 4,
    matchingKey: 'nickName',
    type: DataType.STRING,
    validate: {
      required: true,
      minLength: 6,
      maxLength: 50,
    }
  },
  {
    id: 5,
    matchingKey: 'sex',
    type: DataType.OPTIONS,
    desc: 'Male: M\nFemale: F\nOther: O',
    options: [
      { label: 'user.enum.gender.MALE', value: Sex.MALE },
      { label: 'user.enum.gender.FEMALE', value: Sex.FEMALE },
      { label: 'user.enum.gender.OTHER', value: Sex.OTHER },
    ]
  },
  {
    id: 6,
    matchingKey: 'phoneNumber',
    type: DataType.PHONE,
    validate: {
      required: true,
      minLength: 4,
      maxLength: 20,
    }
  },
  {
    id: 8,
    matchingKey: 'bio',
    type: DataType.STRING,
    validate: {
      minLength: 0,
      maxLength: 4000,
    }
  },
  {
    id: 9,
    matchingKey: 'status',
    desc: 'Inactive: 0\nWaiting for approve: 1\nActive: 2\nSuspended: 3\nDeleted: 4',
    type: DataType.OPTIONS,
    options: [
      { label: 'user.enum.status.INACTIVE', value: UserStatus.INACTIVE },
      { label: 'user.enum.status.WAITING_FOR_APPROVE', value: UserStatus.WAITING_FOR_APPROVE },
      { label: 'user.enum.status.ACTIVE', value: UserStatus.ACTIVE },
      { label: 'user.enum.status.SUSPENDED', value: UserStatus.SUSPENDED },
      { label: 'user.enum.status.DELETED', value: UserStatus.DELETED }
    ],
    validate: {
      required: true,
    }
  },
  {
    id: 10,
    matchingKey: 'createdAt',
    type: DataType.DATE,
    validate: {
      updateIgnore: true
    }
  },
  {
    id: 11,
    matchingKey: 'updatedAt',
    type: DataType.DATE,
  },
] as MappingConfigField[]);
