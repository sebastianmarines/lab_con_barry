import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Render,
  Session,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { UsersService } from '../users/users.service';

import * as QRCode from 'qrcode';
import { CertificateCreationDto } from './certificates.dto';

@Controller('certificates')
export class CertificatesController {
  constructor(
    private readonly certificatesService: CertificatesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @Render('certificates/detail')
  async userCertificate(@Session() session): Promise<any> {
    if (!session.user) {
      throw new HttpException('No autorizado', 401);
    }

    const certificate = await this.certificatesService.findOne(
      session.user.ID_Certificado,
    );

    if (!certificate) {
      throw new HttpException('Certificado no encontrado', 404);
    }

    const url = process.env.LOCAL
      ? 'http://localhost:3000'
      : 'http://54.90.232.18:3000';
    const qr = await QRCode.toDataURL(
      `${url}/certificates/${certificate.ID_Certificado}`,
    );

    return {
      certificate: certificate,
      user: session.user,
      qr: qr,
    };
  }

  @Get(':id')
  @Render('certificates/detail')
  async getCertificate(@Param('id') id: string): Promise<any> {
    const _id = +id;

    if (isNaN(_id)) {
      throw new HttpException('ID inválido', 400);
    }

    const certificate = await this.certificatesService.findOne(_id);

    if (!certificate) {
      throw new HttpException('Certificado no encontrado', 404);
    }

    const user = await this.usersService.findUserByCertificateId(_id);
    const url = process.env.LOCAL
      ? 'http://localhost:3000'
      : 'http://54.90.232.18:3000';
    const qr = await QRCode.toDataURL(`${url}/certificates/${_id}`);

    return {
      certificate: certificate,
      user: user,
      qr: qr,
    };
  }

  @Post('')
  async createCertificate(
    @Body() certificateBody: CertificateCreationDto,
  ): Promise<any> {
    return await this.certificatesService.create(certificateBody.Matricula);
  }
}
