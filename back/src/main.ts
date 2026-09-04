import * as dotenv from 'dotenv';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { GraphqlExceptionFilter } from './common/filters/graphql-exception.filter';

const envFile = process.env.MODE_ENV === 'TEST' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new GraphqlExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.getConfig().APP_PORT || 3000;

  await app.listen(port);
  new Logger('Bootstrap').log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
