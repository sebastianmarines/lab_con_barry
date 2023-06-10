import {
  Controller,
  Get,
  HttpException,
  Param,
  Render,
  Session,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { UsersService } from '../users/users.service';

import * as QRCode from 'qrcode';

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

    const qr = await QRCode.toDataURL(
      `http://localhost:3000/certificates/${certificate.ID_Certificado}`,
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

    const qr = await QRCode.toDataURL(
      `http://localhost:3000/certificates/${_id}`,
    );

    return {
      certificate: certificate,
      user: user,
      qr: qr,
    };
  }
}
