import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Certificate } from './certificates.model';

@Injectable()
export class CertificatesService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  findOne(id: number): Promise<Certificate> {
    return this.knex('Certificado').where('ID_Certificado', id).first();
  }
}
