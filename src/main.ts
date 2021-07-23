import { ValidationPipe } from '@nestjs/common';
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

  // OPEN API Docs
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Api Example')
    .setDescription('Routes for Tether - Reach Your Goals Together')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 8000);
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'develop') {
    console.log(
      chalk.black.bgYellow(
        `\n~~ Api running at http://localhost:${process.env.PORT || 8000} ~~`,
      ),
    );
  }
}
bootstrap();
