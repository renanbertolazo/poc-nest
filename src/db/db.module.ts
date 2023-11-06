import { Module } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { MYSQL_CONNECTION } from '../constants';

const dbProvider = {
  provide: MYSQL_CONNECTION,
  useFactory: async () => {
    console.log('Creating pool...');

    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'teste-nest',
      waitForConnections: true,
      connectionLimit: 10, // Número máximo de conexões no pool
      queueLimit: 0, // Limite da fila para conexões
    });

    return pool;
  },
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
