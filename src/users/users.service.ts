import {
  Injectable,
  NotFoundException,
  // InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
// import { Tether } from 'src/tethers/tether.entity';
// import { TethersService } from 'src/tethers/tethers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async find(userId: string) {
    return this.usersRepository.find({
      where: {
        id: userId,
      },
    });
  }

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

  // async findTethersById(id: string): Promise<Tether[]> {
  //   const query = TethersService.find({
  //     where: {
  //       tether_created_by: id,
  //     },
  //   });

  //   try {
  //     const tethers = await query;
  //     return tethers;
  //   } catch (error) {
  //     throw new InternalServerErrorException();
  //   }
  // }

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
      // .leftJoinAndSelect('users.tethers', 'tethers')
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

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }

  async updateOne(id: string, userData: Partial<UpdateUserDto>) {
    const { affected } = await this.usersRepository.update(id, userData);
    if (affected === 0) {
      return new NotFoundException('');
    }
    const user = await this.findById(id);
    delete user.password;
    return user;
  }
}
