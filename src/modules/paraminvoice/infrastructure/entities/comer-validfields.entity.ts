import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('comer_camposvalidos', { schema: 'sera' })
export class ComerValidfieldsEntity {
  @PrimaryColumn({
    type: 'character varying',
    name: 'id_columna',
    length: '30',
  })
  id: string;

  @Column({
    type: 'character varying',
    name: 'tipo',
    length: '15',
  })
  type: string;

  @Column({
    type: 'numeric',
    name: 'longitud',

    precision: 10,
  })
  length: number;

  @Column({
    type: 'character varying',
    name: 'descripcion',
    length: '60',
  })
  description: string;
}
