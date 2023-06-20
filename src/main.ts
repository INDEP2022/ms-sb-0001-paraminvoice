import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'src/core/interfaces/response.interceptor';

const docsEndpoint = '/api';
const title = 'Bienes Programacion API';
const subtitle = 'Microservicio de movimiento cuentas';
const descripcion = 'API Gestión de la parametrización necesaria que será aplicada en los procesos de facturación, entre las cuales se encuentran las causas de refacturación, estatus de facturas.';

new Logger(subtitle);

function configureSwagger(app): void {
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(descripcion)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docsEndpoint, app, document);
}

async function bootstrap() {

  const ms_port_micro = process.env.MS_PORT_MICRO ? Number(process.env.MS_PORT_MICRO) : 3001;
  const app_port = process.env.HOST_PORT ? Number(process.env.HOST_PORT) : 3000;
  const host_name = process.env.HOST_NAME ? process.env.HOST_NAME : '0.0.0.0';

  const app = await NestFactory.create(AppModule);
  const moduleRef = app.select(AppModule);
  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*' });

  configureSwagger(app);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: host_name,
      port: ms_port_micro
    },
  });

  await app.startAllMicroservices();
  await app.listen(app_port);
  console.log(`Microservice listening INTERNAL${process.env.MS_NAME} on Enviroment:`, process.env.ENV);
  console.log(`Microservice listening INTERNAL${process.env.MS_NAME} name:`, process.env.MS_NAME);
  console.log(`Microservice listening INTERNAL${process.env.MS_NAME} on ports:`, app_port + ":" + ms_port_micro);
  console.log(`Microservice INTERNAL${process.env.MS_NAME} is running on: ${await app.getUrl()}`);
}

bootstrap();