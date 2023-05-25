import { Controller, Get, Render, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(@Res() res, @Session() session) {
    return { user: session.user };
  }

  @Get('recursos')
  @Render('recursos')
  getRecursos(@Res() res, @Session() session) {
    return { user: session.user };
  }
}
