import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const numero = Number(value);
    if (!Number.isInteger(numero) || numero <= 0) {
      throw new BadRequestException(
        `El parámetro '${metadata.data}' debe ser un entero positivo`,
      );
    }
    return numero;
  }
}