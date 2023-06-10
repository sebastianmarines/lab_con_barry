import { Module } from '@nestjs/common';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService, UsersService],
})
export class CertificatesModule {}
