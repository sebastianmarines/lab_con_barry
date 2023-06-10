import { Controller, Get, Render } from '@nestjs/common';
import { ToolsService } from './tools.service';

import * as QRCode from 'qrcode';

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
}
