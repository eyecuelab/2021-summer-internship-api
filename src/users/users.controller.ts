import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get All Users
  @UseGuards(JwtAuthGuard)
  @Get('/')
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
