export interface ServerResponse<T> {
  message: string;
  data: T;
  statusCode: number;
}
