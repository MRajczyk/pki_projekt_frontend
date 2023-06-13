export interface LoginResponseModel {
  accessToken: string;
  refreshToken: string;
  counter: Number,
  lastVisit: string,
  roles: [string];
}
