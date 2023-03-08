import { Module } from '@nestjs/common';
import { ComerValidfieldsModule } from './comer-validfields/comer-validfields.module';

@Module({
  imports: [ComerValidfieldsModule],
  providers: [],
  controllers: [],
})
export class ParaminvoiceModule {}
