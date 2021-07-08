import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateParticipantDto } from './dto/createParticipant.dto';
import { UpdateParticipantDto } from './dto/updateParticipant.dto';
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
  getLeftJoin(
    @Param('tether_id', ParseUUIDPipe) tether_id: string,
  ): Promise<Participant[]> {
    return this.participantsService.getParticipantTetherDetails(tether_id);
  }

  // Gets all Tethers that this User is Participating in
  @UseGuards(JwtAuthGuard)
  @Get('/user/:user_id')
  getLeftJoinUser(
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
  @Post(':tether_id/:user_id')
  async create(
    // @Request() participant_req,
    @Body() createParticipantDto: CreateParticipantDto,
  ): Promise<Participant[]> {
    this.participantsService.create(createParticipantDto);
    return this.participantsService.getParticipants();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update/:participant_id')
  async update(
    @Param('participant_id', ParseUUIDPipe) participant_id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.updateOne(
      participant_id,
      updateParticipantDto,
    );
  }
}
