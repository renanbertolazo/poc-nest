import { Module } from '@nestjs/common';
// import { MysqlModule } from 'nest-mysql';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // MysqlModule.forRoot({
    //   host: 'localhost',
    //   database: 'teste-nest',
    //   password: '',
    //   user: 'root',
    //   port: 3306,
    // }),
    UsersModule,
  ],
})
export class AppModule {}
