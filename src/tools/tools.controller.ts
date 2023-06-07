import { Controller, Get, Render } from '@nestjs/common';
import { ToolsService } from './tools.service';

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
}
