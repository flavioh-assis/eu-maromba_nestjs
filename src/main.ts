import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Eu Maromba API')
    .setDescription('API documentation para o projeto Eu Maromba')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tryItOutEnabled: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
