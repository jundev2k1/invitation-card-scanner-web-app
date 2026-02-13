import { ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

export async function baseQuery<T>(promise: Promise<AxiosResponse<T>>): Promise<ApiResponse<T | null>> {
  const { data } = await promise
  return data as ApiResponse<T>;
}
