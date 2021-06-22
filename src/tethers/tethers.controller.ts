import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTetherDto } from './dto/createTether.dto';
import { UpdateTetherDto } from './dto/updateTether.dto';
import { TethersService } from './tethers.service';
import { Tether } from './tether.entity';

// @ApiBearerAuth()
@Controller('tethers')
export class TethersController {
  constructor(private readonly tethersService: TethersService) {}

  // Get all Tethers
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  findAll(): Promise<Tether[]> {
    return this.tethersService.getAllTethers();
  }

  // Get one Tether by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.tethersService.findOne(id, req.user.id);
  }

  // Create a Tether
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createTetherDto: CreateTetherDto) {
    return this.tethersService.create(createTetherDto, req.user);
  }

  // Edit one Tether by Id
  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userParams: UpdateTetherDto,
  ) {
    return this.tethersService.updateOne(id, userParams);
  }

  // Delete Tether by ID
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.tethersService.deleteTether(id);
  }
}
