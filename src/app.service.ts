import { Injectable } from '@nestjs/common';
// import { User } from './users/user.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTest(): string {
    return 'test';
  }
}
