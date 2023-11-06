import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './user.repository';
import { DbConnectionModule } from 'src/db/connection.module';
// import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbConnectionModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
