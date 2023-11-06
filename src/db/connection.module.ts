import { Module, Injectable, Inject, Scope } from '@nestjs/common';
import { DbModule } from './db.module';
import { MYSQL_CONNECTION } from '../constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class DbService {
  private connection: any; // Armazena a conexão
  private uuid: string;

  constructor(@Inject(MYSQL_CONNECTION) private readonly connectionPool: any) {
    // console.log(uuidv4);
    // this.uuid = uuidv4();
    console.log('instanciou o db');
  }

  // async createConnection() {
  //   console.log('Getting a connection from the pool...');
  //   this.connection = await this.connectionPool.getConnection();
  // }

  async getConnection() {
    if (!this.connection) {
      console.log('criou uma conexao');
      this.connection = await this.connectionPool.getConnection();
      this.uuid = await uuidv4();
      console.log('uuid criado :' + this.uuid);
    }
    return {
      connection: this.connection,
      uuid: this.uuid,
    };
  }
}

@Module({
  imports: [DbModule],
  providers: [DbService],
  exports: [DbService],
})
export class DbConnectionModule {}
