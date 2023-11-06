import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  // Scope
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { DbService } from '../db/connection.module';
// import { CONNECTION, UUID } from 'src/interceptors/transaction.interceptor';
// import { REQUEST } from '@nestjs/core';
// import { PoolConnection } from 'mysql2/promise';

@Injectable(/* { scope: Scope.REQUEST } */)
export class UsersRepository {
  constructor(
    /* @Inject(REQUEST) private request: Request */ private readonly dbService: DbService,
  ) {
    console.log('user repository');
  }

  public async create(createUserDto: CreateUserDto): Promise<void> {
    try {
      const connection = await this.dbService.getConnection();
      const { firstName, lastName, email } = createUserDto;
      // console.log('key no repositório: ' + this.request[UUID]);

      console.log('uuid n repository :' + connection.uuid);

      // const connection = this.request[CONNECTION] as PoolConnection;

      const user = await connection.connection.query(
        'INSERT INTO users (firstName, lastName, email)  VALUES (?, ?, ?)',
        [firstName, lastName, email],
      );
      console.log(user);

      throw new HttpException('error teste', HttpStatus.BAD_REQUEST);
      // const user = await this.connection.query(
      //   'INSERT INTO users (firstName, lastName, email)  VALUES (?, ?, ?)',
      //   [firstName, lastName, email],
      // );
      // console.log(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
