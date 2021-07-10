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

  // Gets all Participants records (ultimately not really needed)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getParticipants(): Promise<Participant[]> {
    return this.participantsService.getParticipants();
  }

  // Gets all Users that are Participants on a Tether
  @UseGuards(JwtAuthGuard)
  @Get('/tether/:tether_id')
  getParticipantTetherDetails(
    @Param('tether_id', ParseUUIDPipe) tether_id: string,
  ): Promise<Participant[]> {
    return this.participantsService.getParticipantTetherDetails(tether_id);
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

  // Get count of a User's Tethers
  @UseGuards(JwtAuthGuard)
  @Get('/count/:user_id')
  countParticipatingTethers(
    @Param('user_id', ParseUUIDPipe) user_id: string,
  ): Promise<number> {
    return this.participantsService.countParticipatingTethers(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    // @Request() participant_req,
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant[]> {
    this.participantsService.create(createParticipantDto);
    return this.participantsService.getParticipants();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/addIncrement/:participant_id')
  async addIncrement(
    @Param('participant_id', ParseUUIDPipe) participant_id: string,
  ) {
    return this.participantsService.addIncrement(participant_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/subIncrement/:participant_id')
  async subIncrement(
    @Param('participant_id', ParseUUIDPipe) participant_id: string,
  ) {
    return this.participantsService.subIncrement(participant_id);
  }
}
