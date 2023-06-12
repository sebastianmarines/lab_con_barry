import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  Session,
} from '@nestjs/common';
import { ToolsService } from './tools.service';

import * as QRCode from 'qrcode';
import { ReservationCreationDto } from './tools.dto';
import { Reservation } from './tools.model';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  @Render('tools/list')
  async findAll(@Session() session): Promise<any> {
    const availableTools = await this.toolsService.findAll();
    return {
      tools: availableTools,
      user: session.user,
    };
  }

  @Get('qr')
  @Render('tools/qr')
  async getQR(@Session() session): Promise<any> {
    const qr = await QRCode.toDataURL('https://www.google.com');
    return {
      qr: qr,
      user: session.user,
    };
  }

  @Post('/reservation')
  async createReservation(
    @Body() reservation: ReservationCreationDto,
    @Res() res,
  ): Promise<any> {
    const reserva: Reservation = {
      ID_Herramienta: reservation.ID_Herramienta,
      Matricula: reservation.Matricula,
      Fecha_hora_reserva: new Date(
        `${reservation.Fecha_reserva} ${reservation.Hora_reserva}`,
      ),
      Cantidad: 1,
    };

    const created = await this.toolsService.createReservation(reserva);
    res.redirect('/tools');
  }
}
