import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  // Post,
  Put,
  Request,
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

  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userParams: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, userParams);
    // return `test update ID ${id}`;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get(':username')
  // async findByUsername(@Param('username') username: string): Promise<User> {
  //   return this.usersService.findOne({ username });
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async create(@Request() req, @Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto, req.user);
  // }
}
