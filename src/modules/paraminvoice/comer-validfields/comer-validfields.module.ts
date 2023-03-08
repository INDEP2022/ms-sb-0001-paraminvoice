import { ComerValidfieldsController } from './comer-validfields.controller';
import { ComerValidfieldsEntity } from '../infrastructure/entities/comer-validfields.entity';
import { ComerValidfieldsService } from './comer-validfields.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonFilterService } from 'src/shared/service/common-filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComerValidfieldsEntity])],
  controllers: [ComerValidfieldsController],
  providers: [ComerValidfieldsService, CommonFilterService],
})
export class ComerValidfieldsModule {}
