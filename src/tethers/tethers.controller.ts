import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTetherDto } from './dto/createTether.dto';
import { TethersService } from './tethers.service';

@ApiBearerAuth()
@Controller('tethers')
export class TethersController {
  constructor(private readonly tethersService: TethersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(@Request() req) {
    return this.tethersService.find(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.tethersService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createTetherDto: CreateTetherDto) {
    return this.tethersService.create(createTetherDto, req.user);
  }
}
