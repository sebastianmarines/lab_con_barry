import { Controller, Get, Logger, Render, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(@Res() res, @Session() session) {
    this.logger.log(`session: ${session.user?.Nombre}`);
    return { user: session.user };
  }

  @Get('recursos')
  @Render('recursos')
  getRecursos(@Res() res, @Session() session) {
    return { user: session.user };
  }

  @Get('videojuego')
  @Render('videogame')
  getVideojuego(@Res() res, @Session() session) {
    return { user: session.user };
  }

  @Get('play')
  @Render('videojuego_frame')
  getPlay(@Res() res, @Session() session) {
    return { user: session.user };
  }
}
