import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from 'sigebi-lib-common';

const logger = new Logger('Microservice PARAMETRIZACIÓN FACTURAS');

const docsEndpoint = '/api';
const title = 'Bienes Programacion API'; //process.env.MS_HOST;

function configureSwagger(app): void {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('API Gestión de la parametrización necesaria que será aplicada en los procesos de facturación, entre las cuales se encuentran las causas de refacturación, estatus de facturas.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsEndpoint, app, document);
}

/*
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  });
  app.listen();
}
*/

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  //const configService = app.get(ConfigService);
  app.enableCors({ origin: '*' });

  const moduleRef = app.select(AppModule);
  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  configureSwagger(app);

  // Then combine it with a RabbitMQ microservice
  /*
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get('rb_url')}`],
      queue: `${configService.get('post_queue')}`,
      queueOptions: { durable: false },
      prefetchCount: 1,
    },
  });
*/

  // La ruta en que se sirve la documentación
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.startAllMicroservices();
  await app.listen(`${process.env.MS_PORT}`);
  logger.log(
    `🚀 Procedure programminggood service running on port ${process.env.MS_PORT}}`,
  );
}
bootstrap();
