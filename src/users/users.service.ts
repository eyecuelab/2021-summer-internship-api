import { Injectable } from '@nestjs/common';
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

  async findOne(attributes: Partial<User>): Promise<User | undefined> {
    const options: FindOneOptions<User> = {
      where: {
        ...attributes,
      },
    };
    const user = await this.usersRepository.findOne(options);
    delete user.password;
    return user;
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        username: username,
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
    const newUser = await this.usersRepository.create({
      ...userData,
      tethers_ongoing: 0,
      tethers_completed: 0,
      xp: 0,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
