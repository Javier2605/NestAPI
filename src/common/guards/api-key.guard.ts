import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey = process.env.API_KEY ?? 'mi-clave-secreta';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clave = request.headers['x-api-key'];

    if (clave !== this.apiKey) {
      throw new UnauthorizedException('API key inválida o ausente');
    }
    return true;
  }
}