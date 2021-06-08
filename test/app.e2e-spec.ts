import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { internet } from 'faker';
import { Test } from '@nestjs/testing';
import { RegisterDto } from '../src/auth/dto/register.dto';
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';

// class TestLogger implements LoggerService {
//   log(message: string) {
//     console.log(message);
//   }
//   error(message: string, trace: string) {
//     console.error(message);
//     console.error(trace);
//   }
//   warn(message: string) {
//     console.warn(message);
//   }
//   debug(message: string) {
//     console.debug(message);
//   }
//   verbose(message: string) {
//     console.log(message);
//   }
// }

describe('App e2e', () => {
  let app: INestApplication;
  const testInput: RegisterDto = {
    username: internet.userName(),
    email: internet.email(),
    password: internet.password(),
  };
  let user: any;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modRef.createNestApplication();
    // app.useLogger(new TestLogger());
    app = await app.init();
    const connection = app.get(Connection);
    await connection.dropDatabase();
    await connection.synchronize();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Authentication', () => {
    let jwtToken: string;

    describe('AuthModule', () => {
      it('should register a user', async () => {
        const registerRes = await request(app.getHttpServer())
          .post('/register')
          .send(testInput)
          .expect(201);
        user = registerRes.body;
      });

      // assume test data includes user test@example.com with password 'password'
      it('authenticates user with valid credentials and provides a jwt token', async () => {
        const { username, password } = testInput;
        const response = await request(app.getHttpServer())
          .post('/login')
          .send({ username, password })
          .expect(200);

        // set jwt token for use in subsequent tests
        jwtToken = response.body.access_token;
        expect(jwtToken).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        ); // jwt regex
      });

      it('fails to authenticate user with an incorrect password', async () => {
        const { username } = testInput;
        const response = await request(app.getHttpServer())
          .post('/login')
          .send({ username, password: 'wrong' })
          .expect(401);

        expect(response.body.access_token).not.toBeDefined();
      });

      // assume test data does not include a nobody@example.com user
      it('fails to authenticate user that does not exist', async () => {
        const response = await request(app.getHttpServer())
          .post('/login')
          .send({ username: 'nobody@example.com', password: 'test' })
          .expect(401);

        expect(response.body.access_token).not.toBeDefined();
      });
    });

    describe('Protected', () => {
      it('rejects requests to protected resource without jwt', async () => {
        return request(app.getHttpServer()).get('/profile').expect(401);
      });
      it('gets protected resource with jwt authenticated request', async () => {
        return request(app.getHttpServer())
          .get('/profile')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200, user);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
