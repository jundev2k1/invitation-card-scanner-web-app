export interface ApiResponse<T> {
  data: T | null;
  statusCode: number;
  messageCode: string;
  message: string;
  details: any | null;
}
