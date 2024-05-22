export interface AdminCreationDto {
  email: string;
  password: string;
  roles: AdminRoleDto[];
}

export interface AdminRoleDto {
  name: string;
  privileges: AdminPrivilegeDto[];
}

export interface AdminPrivilegeDto {
  name: string;
}
