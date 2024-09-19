export interface RootObject {
  message: string;
  result: boolean;
  data: ResponseData;
}

export interface ResponseData {
  userId?: number;
  emailId: string;
  token: string;
  refreshToken: string;
}
