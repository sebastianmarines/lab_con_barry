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

  async create(matricula: string): Promise<boolean> {
    const createdCertificate: Certificate = {
      FechaDeCreacion: new Date(),
      Calificacion: 10,
    };

    // Create certificate and associate it to the user
    // const [{ ID_Certificado }] = await this.knex<Certificate>(
    //   'Certificado',
    // ).insert(createdCertificate, ['ID_Certificado']);
    // console.log(ID_Certificado);
    // await this.knex('Alumno')
    //   .update({
    //     ID_Certificado: ID_Certificado,
    //   })
    //   .where('Matricula', matricula);
    //
    // return createdCertificate;
    await this.knex.transaction(async (trx) => {
      const [{ ID_Certificado }] = await trx<Certificate>('Certificado').insert(
        createdCertificate,
        ['ID_Certificado'],
      );
      await trx('Alumno')
        .update({
          ID_Certificado: ID_Certificado,
        })
        .where('Matricula', matricula);
    });

    return true;
  }
}
