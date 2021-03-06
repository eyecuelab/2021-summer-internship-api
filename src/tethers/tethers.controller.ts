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

@ApiBearerAuth()
@Controller('tethers')
export class TethersController {
  constructor(private readonly tethersService: TethersService) {}

  // Get all Tethers
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getTethers(): Promise<Tether[]> {
    return this.tethersService.getAllTethers();
  }

  // Get all that are complete and are mine
  @UseGuards(JwtAuthGuard)
  @Get('/complete/:tether_created_by')
  async findComplete(
    @Param('tether_created_by', ParseUUIDPipe) tether_created_by: string,
  ): Promise<Tether[]> {
    return this.tethersService.findComplete(tether_created_by);
  }

  // Get Tethers completed in the last 24 hours
  @UseGuards(JwtAuthGuard)
  @Get('/recent')
  async getRecent(): Promise<Tether[]> {
    return this.tethersService.getRecent();
  }

  // Create a Tether
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() tether_req,
    @Body() createTetherDto: CreateTetherDto,
  ): Promise<Tether> {
    return this.tethersService.create(createTetherDto, tether_req.user);
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

  // Update Complete Date
  @UseGuards(JwtAuthGuard)
  @Patch('/complete/:tether_id')
  async updateCompleteDate(
    @Param('tether_id', ParseUUIDPipe) tether_id: string,
  ) {
    return this.tethersService.completeTether(tether_id);
  }

  // Update Full Date
  @UseGuards(JwtAuthGuard)
  @Patch('/full/:tether_id')
  async updateFullDate(@Param('tether_id', ParseUUIDPipe) tether_id: string) {
    return this.tethersService.fullTether(tether_id);
  }

  // Delete Tether by ID
  @UseGuards(JwtAuthGuard)
  @Delete(':tether_id')
  async deleteUser(@Param('tether_id', ParseUUIDPipe) tether_id: string) {
    return this.tethersService.deleteTether(tether_id);
  }
}
