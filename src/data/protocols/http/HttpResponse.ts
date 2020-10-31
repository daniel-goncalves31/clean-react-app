export enum HttpStatusCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNATHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}

export interface HttpResponse<T> {
  statusCode: HttpStatusCode
  body?: T
}
