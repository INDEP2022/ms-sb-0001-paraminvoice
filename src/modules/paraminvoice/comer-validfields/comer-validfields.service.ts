import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery } from 'nestjs-paginate';
import { CRUDMessages } from 'src/core/interfaces/messages.enum';
import { CommonFilterService } from 'src/shared/service/common-filter.service';
import { Repository } from 'typeorm';
import { ComerValidfieldsEntity } from '../infrastructure/entities/comer-validfields.entity';
import {
  ComerValidfieldsDto,
  ComerValidfieldsInDto,
} from './dto/comer-validfields.dto';

@Injectable()
export class ComerValidfieldsService {
  constructor(
    @InjectRepository(ComerValidfieldsEntity)
    private repository: Repository<ComerValidfieldsEntity>,
    private commonFilterService: CommonFilterService,
  ) {}

  async findAllRegisters(query: PaginateQuery) {
    const queryBuilder = this.repository.createQueryBuilder('table');
    return await this.commonFilterService.paginateFilter<ComerValidfieldsEntity>(
      query,
      this.repository,
      queryBuilder,
      'id',
    );
  }

  async findOneRegister(dto: ComerValidfieldsInDto) {
    const value = await this.repository.findOne({ where: { id: dto.id } });
    return value
      ? {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.GetSuccess],
          data: value,
          count: 1,
        }
      : {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [CRUDMessages.GetNotfound],
          data: [],
          count: 0,
        };
  }

  async createNewRegister(dto: ComerValidfieldsDto) {
    try {
      const creation = await this.repository.save(dto);

      return {
        statusCode: HttpStatus.OK,
        message: [CRUDMessages.CreateSuccess],
        data: creation,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error.message],
      };
    }
  }

  async updateRegister(dto: ComerValidfieldsDto) {
    try {
      const { affected } = await this.repository.update({ id: dto.id }, dto);
      if (affected == 1) {
        return {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.UpdateSuccess],
        };
      } else
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['El registro no existe!'],
        };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error.message],
      };
    }
  }

  async deleteRegister(dto: ComerValidfieldsInDto) {
    try {
      const { affected } = await this.repository.delete({ id: dto.id });
      if (affected == 1) {
        return {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.DeleteSuccess],
        };
      } else
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['El registro no existe!'],
        };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error.message],
      };
    }
  }
}
