import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async find(userId: string) {
    return this.usersRepository.find({
      where: {
        user: userId,
      },
    });
  }

  // async findOne(attributes: Partial<User>): Promise<User | undefined> {
  //   const options: FindOneOptions<User> = {
  //     where: {
  //       ...attributes,
  //     },
  //   };
  //   const user = await this.usersRepository.findOne(options);
  //   delete user.password;
  //   return user;
  // }

  async findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .getMany();
    return user;
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
}
