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
// import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTetherDto } from './dto/createTether.dto';
import { UpdateTetherDto } from './dto/updateTether.dto';
import { TethersService } from './tethers.service';
import { Tether } from './tether.entity';
import { GetTethersFilterDto } from './dto/getTethersFilter.dto';

// @ApiBearerAuth()
@Controller('tethers')
export class TethersController {
  constructor(private readonly tethersService: TethersService) {}

  // Get all Tethers
  // @UseGuards(JwtAuthGuard)
  // @Get('/')
  // findAll(): Promise<Tether[]> {
  //   return this.tethersService.getAllTethers();
  // }

  @Get('/')
  getTasks(@Query() filterDto: GetTethersFilterDto): Promise<Tether[]> {
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
    return this.tethersService.create(createTetherDto, tether_req.user);
  }

  // Edit one Tether by Id
  // @UseGuards(JwtAuthGuard)
  @Patch(':tether_id')
  async update(
    @Param('tether_id', ParseUUIDPipe) tether_id: string,
    @Body() userParams: UpdateTetherDto,
  ) {
    return this.tethersService.updateOne(tether_id, userParams);
  }

  // Delete Tether by ID
  @Delete(':tether_id')
  async deleteUser(@Param('tether_id', ParseUUIDPipe) tether_id: string) {
    return this.tethersService.deleteTether(tether_id);
  }
}
