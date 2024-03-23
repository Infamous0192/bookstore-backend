import { registerAs } from '@nestjs/config';
import validateConfig from '.././utils/validate-config';
import { IsOptional, IsString } from 'class-validator';

export type AuthConfig = {
  secret: string;
};

class AuthVariablesValidator {
  @IsString()
  @IsOptional()
  JWT_SECRET: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, AuthVariablesValidator);

  return {
    secret: process.env.AUTH_JWT_SECRET || 'thisisasecret',
  };
});
