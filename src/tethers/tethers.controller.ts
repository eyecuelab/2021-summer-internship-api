import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTetherDto } from './dto/createTether.dto';
import { UpdateTetherDto } from './dto/updateTether.dto';
import { TethersService } from './tethers.service';
import { Tether } from './tether.entity';
import { GetTethersFilterDto } from './dto/getTethersFilter.dto';

@ApiBearerAuth()
@Controller('tethers')
export class TethersController {
  constructor(private readonly tethersService: TethersService) {}

  // Get all Tethers
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getTethers(@Query() filterDto: GetTethersFilterDto): Promise<Tether[]> {
    return this.tethersService.getAllTethersFiltered(filterDto);
  }

  // Get one Tether by ID
  @UseGuards(JwtAuthGuard)
  @Get(':tether_id')
  async findOne(
    @Request() tether_req,
    @Param('tether_id', ParseUUIDPipe) tether_id: string,
  ) {
    return this.tethersService.findOne(tether_id, tether_req.user.id);
  }

  // Create a Tether
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() tether_req,
    @Body() createTetherDto: CreateTetherDto,
  ) {
    this.tethersService.create(createTetherDto, tether_req.user);
    return this.tethersService.getAllTethers();
  }

  // Edit one Tether by Id
  @UseGuards(JwtAuthGuard)
  @Patch(':tether_id')
  async update(
    @Param('tether_id', ParseUUIDPipe) tether_id: string,
    @Body() userParams: UpdateTetherDto,
  ) {
    return this.tethersService.updateOne(tether_id, userParams);
  }

  //Add a user to a Tether
  @UseGuards(JwtAuthGuard)
  @Patch(':tether_id/add/:id')
  async addToTether(
    @Param('tether_id', ParseUUIDPipe) tether_id: string,
    @Param('id', ParseUUIDPipe) user_id: string,
  ) {
    return this.tethersService.addUserToTether(tether_id, user_id);
  }

  // Delete Tether by ID
  @UseGuards(JwtAuthGuard)
  @Delete(':tether_id')
  async deleteUser(@Param('tether_id', ParseUUIDPipe) tether_id: string) {
    return this.tethersService.deleteTether(tether_id);
  }
}
