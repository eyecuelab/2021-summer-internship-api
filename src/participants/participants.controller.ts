import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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

  // Gets all Participants records
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getParticipants(): Promise<Participant[]> {
    return this.participantsService.getParticipants();
  }

  // Gets all Tethers that this User is Participating in
  @UseGuards(JwtAuthGuard)
  @Get('/user/:user_id')
  getParticipantUserDetails(
    @Param('user_id', ParseUUIDPipe) user_id: string,
  ): Promise<Participant[]> {
    return this.participantsService.getParticipantUserDetails(user_id);
  }

  // Get all Users Participating on one Tether
  @UseGuards(JwtAuthGuard)
  @Get('/alldeets/:tether_id')
  getFullParticipantDetails(
    @Param('tether_id', ParseUUIDPipe) tether_id: string,
  ): Promise<Participant[]> {
    return this.participantsService.getFullParticipantDetails(tether_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant[]> {
    this.participantsService.create(createParticipantDto);
    return this.participantsService.getParticipants();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/addIncrement/:participant_id')
  async addIncrement(
    @Param('participant_id', ParseUUIDPipe) participant_id: string,
  ): Promise<Participant> {
    return this.participantsService.addIncrement(participant_id);
  }
}
