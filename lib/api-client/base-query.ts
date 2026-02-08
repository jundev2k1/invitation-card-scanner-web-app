import { AxiosResponse } from 'axios';

export async function baseQuery<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
  const { data } = await promise
  return data
}
