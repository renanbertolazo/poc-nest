// import {
//   BadRequestException,
//   HttpException,
//   HttpStatus,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectClient } from 'nest-mysql';
// import { Connection } from 'mysql2';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './interfaces/user.interface';

// @Injectable()
// export class UsersRepository {
//   constructor(@InjectClient() private readonly connection: Connection) {}

//   public async selectAll(): Promise<User> {
//     const users = await this.connection.query('SELECT * FROM users');
//     const results = Object.assign([{}], users[0]);

//     return results;
//   }

//   public async selectOne(id: string): Promise<User> {
//     if (!id) {
//       throw new BadRequestException();
//     }

//     const user = await this.connection.query('SELECT * FROM users WHERE id=?', [
//       id,
//     ]);

//     if (!user) {
//       throw new NotFoundException();
//     }

//     const result = Object.assign([{}], user[0]);

//     return result;
//   }

//   public async create(createUserDto: CreateUserDto): Promise<void> {
//     try {
//       const { firstName, lastName, email } = createUserDto;
//       const user = await this.connection.query(
//         'INSERT INTO users (firstName, lastName, email)  VALUES (?, ?, ?)',
//         [firstName, lastName, email],
//       );

//       console.log(user);
//     } catch (err) {
//       throw new HttpException(err, HttpStatus.BAD_REQUEST);
//     }
//   }

//   public async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
//     try {
//       const { firstName, lastName, email } = updateUserDto;

//       const users = await this.connection.query(
//         'UPDATE users SET firstName=?, lastName=?, email=? WHERE id=?',
//         [firstName, lastName, email, id],
//       );
//       console.log(users);
//       // return users;
//     } catch (err) {
//       throw new HttpException(err, HttpStatus.BAD_REQUEST);
//     }
//   }

//   public async delete(id: string): Promise<void> {
//     if (!id) {
//       throw new BadRequestException();
//     }

//     const user = await this.connection.query('DELETE FROM users WHERE id=?', [
//       id,
//     ]);
//     console.log(user);
//   }
// }
