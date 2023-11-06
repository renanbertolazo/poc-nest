import {
  Controller,
  // Get,
  Post,
  Body,
  UseInterceptors,
  // Put,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { TransactionInterceptor } from 'src/interceptors/transaction.interceptor';
import { ConnectionInterceptor } from 'src/interceptors/connection.interceptor';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './interfaces/user.interface';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @UseInterceptors(TransactionInterceptor)
  @UseInterceptors(ConnectionInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    await this.usersService.create(createUserDto);
    console.log('testew: ');
    return {
      oi: 'oii',
    };
  }

  // @Get()
  // findAll(): Promise<User> {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<User> {
  //   return this.usersService.findOne(id);
  // }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<void> {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.usersService.remove(id);
  // }
}
