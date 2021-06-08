import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as chalk from 'chalk';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Api Example')
    .setDescription(
      'Simple api with authentication and related resource for saving and rating NASA Astronomy Pictures of the Day',
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'develop') {
    console.log(
      chalk.black.bgYellow(`\n~~ Api running at http://localhost:${port} ~~`),
    );
  }
}
bootstrap();
