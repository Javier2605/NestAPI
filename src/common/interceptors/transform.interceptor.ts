import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface RespuestaApi<T> {
  exito: boolean;
  data: T;
  fecha: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, RespuestaApi<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<RespuestaApi<T>> {
    return next.handle().pipe(
      map((data) => ({
        exito: true,
        data,
        fecha: new Date().toISOString(),
      })),
    );
  }
}