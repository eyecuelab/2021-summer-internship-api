import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateParticipantDto } from './dto/createParticipant.dto';
import { Participant } from './participant.entity';
import { ParticipantsService } from './participants.service';

@ApiBearerAuth()
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  // Gets all Participants records (ultimately not really needed)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getParticipants(): Promise<Participant[]> {
    return this.participantsService.getParticipants();
  }

  // Get all Tether's participants
  @UseGuards(JwtAuthGuard)
  @Get(':tether_id')
  getOneTethersParticipants(
    @Param('tether_id') tether_id: string,
  ): Promise<Participant[]> {
    return this.participantsService.getOneTethersParticipants(tether_id);
  }

  // Get all User's participating Tethers

  @UseGuards(JwtAuthGuard)
  @Post(':tether_id/:user_id')
  async create(
    // @Request() participant_req,
    @Body() createParticipantDto: CreateParticipantDto,
  ) {
    this.participantsService.create(createParticipantDto);
    return this.participantsService.getParticipants();
  }
}
