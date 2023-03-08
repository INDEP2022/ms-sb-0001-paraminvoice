import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';

export const GetAuthUser = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    try {
      const req = ctx.switchToHttp().getRequest();
      const authHeader: string = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const payload: IJWTPayload = parseJwt(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  },
);

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
