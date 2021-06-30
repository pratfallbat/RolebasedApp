import { Role } from './Role';
export class User {
  id: number;
  username: string = '';
  password: string = '';
  name: string = '';
  role: Role;
  token: string = '';
}
