import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  // Post,
  // Request,
  // UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get All Users
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // Get One User by ID
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  // Get One User by Username (not totally cooperating but likely unnecessary)
  // @UseGuards(JwtAuthGuard)
  // @Get(':username')
  // async findByUsername(@Param('username') username: string): Promise<User> {
  //   return this.usersService.findOne({
  //     username,
  //   });
  // }

  // Edit One User by Id
  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userParams: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, userParams);
  }

  // Delete User by ID
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
