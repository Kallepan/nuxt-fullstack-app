import type { IUser } from "./IUser";

export interface ISession {
  authToken: string;
  userId: number;
  user?: IUser;
}
