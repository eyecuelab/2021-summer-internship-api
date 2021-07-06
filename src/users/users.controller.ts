import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { TethersService } from 'src/tethers/tethers.service';
import { ParticipantsService } from 'src/participants/participants.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tethersService: TethersService,
    private readonly participantsService: ParticipantsService,
  ) {}

  // Get All Users
  @UseGuards(JwtAuthGuard)
  @Get('/')
  findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  // Get One User by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne({ id });
  }

  // Get One User's tethers by ID
  // @UseGuards(JwtAuthGuard)
  // @Get(':id/tethers')
  // async findTethersById(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.usersService.findTethersById(id);
  // }

  // Edit One User by Id
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userParams: UpdateUserDto,
  ) {
    return this.usersService.updateOne(id, userParams);
  }

  // Delete User by ID
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
