import {
  // Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  // Post,
  Request,
  // UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.entity';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async create(@Request() req, @Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto, req.user);
  // }
}
