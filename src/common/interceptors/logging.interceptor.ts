import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import type { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const { method, url } = context.switchToHttp().getRequest<Request>();
    const inicio = Date.now();

    return next
      .handle()
      .pipe(tap(() => this.logger.log(`${method} ${url} - ${Date.now() - inicio}ms`)));
  }
}