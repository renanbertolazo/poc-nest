import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './interfaces/user.interface';
import { UsersRepository } from './user.repository';
import { DbService } from 'src/db/connection.module';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly dbService: DbService,
  ) {}

  // public async findAll(): Promise<User> {
  //   return this.usersRepository.selectAll();
  // }

  // public async findOne(id: string): Promise<User> {
  //   return this.usersRepository.selectOne(id);
  // }

  public async create(createUserDto: CreateUserDto): Promise<void> {
    try {
      const connection = await this.dbService.getConnection();
      console.log('uuid no service :' + connection.uuid);

      return this.usersRepository.create(createUserDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  // public async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
  //   try {
  //     return this.usersRepository.update(id, updateUserDto);
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // public async remove(id: string): Promise<void> {
  //   return this.usersRepository.delete(id);
  // }
}
