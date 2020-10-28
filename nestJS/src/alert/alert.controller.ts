import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { MessageBody } from "@nestjs/websockets";
import { AlertGateway } from "./alert.gateway";

@Controller()
export class AppController {
    constructor(private alertGateway: AlertGateway){}

    @Post()
    @HttpCode(200)
    sendAlertToAll(@Body() dto: { message: string}){
       this.alertGateway.sendToAll(dto.message);
       return dto
    }
}