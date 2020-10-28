import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AlertGateway } from './alert/alert.gateway';
import { AppController } from './alert/alert.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ ChatGateway, AlertGateway],
})
export class AppModule {}
