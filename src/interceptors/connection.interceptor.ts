import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Pool, Connection } from 'mysql2/promise';
import { Observable, catchError, concatMap, finalize } from 'rxjs';
import { MYSQL_CONNECTION } from 'src/constants';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/connection.module';

export const UUID = 'UUID';
export const CONNECTION = 'CONNECTION';

@Injectable()
export class ConnectionInterceptor implements NestInterceptor {
  constructor(
    /* @Inject(MYSQL_CONNECTION) private pool: Pool */ private readonly dbService: DbService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    console.log(context);
    const req = context.switchToHttp().getRequest<Request>();
    console.log('pool');
    const connection = await this.dbService.getConnection();
    console.log('uuid no interceptor :' + connection.uuid);

    // const uuid = uuidv4();
    // console.log('uuid aqui do interceptor da connection: ' + uuid);
    // attach query manager with transaction to the request
    // req[UUID] = uuid;
    // req[CONNECTION] = connection;
    const transaction = connection.connection as Connection;

    await transaction.beginTransaction();
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
        await transaction.rollback();
        throw e;
      }),
      // always executed, even if catchError method throws an exception
      finalize(async () => {
        console.log('finalized');
        // await connection.release();
      }),
    );
  }
}
