import { AdminUserDto, AuthStatus } from '@admin/entities';
import { TokenPairDto } from '@admin/shared';

export interface AuthInfoDto {
  authStatus: AuthStatus,
  adminUser: AdminUserDto | null,
  tokenPair?: TokenPairDto
}
