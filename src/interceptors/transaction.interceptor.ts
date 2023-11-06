import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Pool } from 'mysql2/promise';
import { Observable, catchError, concatMap, finalize } from 'rxjs';
import { MYSQL_CONNECTION } from 'src/constants';
import { v4 as uuidv4 } from 'uuid';

export const UUID = 'UUID';
export const CONNECTION = 'CONNECTION';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(@Inject(MYSQL_CONNECTION) private pool: Pool) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    console.log('pool');
    const connection = await this.pool.getConnection();

    const uuid = uuidv4();
    console.log('uuid aqui do interceptor: ' + uuid);
    // attach query manager with transaction to the request
    req[UUID] = uuid;

    await connection.beginTransaction();

    req[CONNECTION] = connection;

    return next.handle().pipe(
      // concatMap gets called when route handler completes successfully
      concatMap(async (data) => {
        console.log(data);
        console.log('commitado?');
        return data;
      }),
      // catchError gets called when route handler throws an exception
      catchError(async (e) => {
        console.log('error');
        console.log(e);
        await connection.rollback();
        throw e;
      }),
      // always executed, even if catchError method throws an exception
      finalize(async () => {
        console.log('finalized');
        await connection.release();
      }),
    );
  }
}
