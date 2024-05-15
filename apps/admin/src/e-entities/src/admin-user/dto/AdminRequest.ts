import { Role } from '@admin/shared';

export type AdminRequest = {
  email: string;
  password: string;
  roles: Array<Role>
}
