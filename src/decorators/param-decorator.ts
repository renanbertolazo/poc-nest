import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const ExtractConnectionFromRequest = createParamDecorator(
  (field: string, req: ExecutionContextHost) => {
    console.log('taeeadaedaedaedadaedadaed');
    const request = req.switchToHttp().getRequest();

    return request[field]; // Extraia o campo desejado da requisição e retorne-o
  },
);
