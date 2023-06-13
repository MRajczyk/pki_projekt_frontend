export interface User {
  _id: string,
  name: string,
  password: string,
  email: string,
  roles: [string],
  joined: string,
  lastVisit: string,
  counter: Number,
  accepted: boolean,
  acceptDeadline: string,
}
