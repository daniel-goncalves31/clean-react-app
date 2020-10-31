export enum HttpStatusCode {
  NO_CONTENT = 204,
  UNAUTHORIZED = 401
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: any
}
