import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';


async function bootstrap() {
  // const server = express();
  // const app = await NestFactory.create<NestExpressApplication>(
  //   AppModule,
  //   new ExpressAdapter(server));
  // await app.init();

  // http.createServer(server).listen(3000);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   app.useWebSocketAdapter(new IoAdapter());
//   app.enableCors({
//     origin: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
// });
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
