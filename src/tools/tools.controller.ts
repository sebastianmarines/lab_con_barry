import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { ToolsService } from './tools.service';

import * as QRCode from 'qrcode';
import { ReservationCreationDto } from './tools.dto';
import { Reservation } from './tools.model';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  @Render('tools/list')
  async findAll(): Promise<any> {
    const availableTools = await this.toolsService.findAll();
    return {
      tools: availableTools,
    };
  }

  @Get('qr')
  @Render('tools/qr')
  async getQR(): Promise<any> {
    const qr = await QRCode.toDataURL('https://www.google.com');
    return {
      qr: qr,
    };
  }

  @Post('/reservation')
  async createReservation(
    @Body() reservation: ReservationCreationDto,
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
    return {
      created: created,
    };
  }
}
