import type { ConfigService } from '@nestjs/config';

export const getJwtConfig = async (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: { expiresIn: '24h' },
});
