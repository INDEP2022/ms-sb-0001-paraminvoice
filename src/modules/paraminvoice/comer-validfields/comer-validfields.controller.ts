import { ComerValidfieldsEntity } from '../infrastructure/entities/comer-validfields.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ComerValidfieldsService } from './comer-validfields.service';
import {
  ComerValidfieldsDto,
  ComerValidfieldsInDto,
} from './dto/comer-validfields.dto';

@ApiCreatedResponse()
@ApiTags('comer_camposvalidos')
@Controller('comer-validfields')
export class ComerValidfieldsController {
  constructor(private readonly service: ComerValidfieldsService) {}

  @ApiOperation({ summary: 'Paginación de todos los registros' })
  @ApiResponse({
    status: 200,
    type: [ComerValidfieldsEntity],
  })
  @ApiQuery({
    name: 'page',
    description: 'Número de página',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limite de elementos',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    description: 'Texto a buscar',
    type: String,
    required: false,
  })
  @Get()
  async findAllRegisters(@Paginate() query: PaginateQuery) {
    return await this.service.findAllRegisters(query);
  }

  @ApiOperation({ summary: 'Busca por su identificador' })
  @ApiParam({
    name: 'id',
    description: 'Busca por su identificador',
  })
  @ApiResponse({
    status: 200,
    type: ComerValidfieldsEntity,
  })
  @Post('find-by-ids')
  async findOneRegisterById(@Body() dto: ComerValidfieldsInDto) {
    return await this.service.findOneRegister(dto);
  }

  @ApiOperation({ summary: 'Guardar nuevo registro' })
  @ApiBody({ type: ComerValidfieldsEntity })
  @ApiResponse({
    status: 200,
    description: 'Guarda un nuevo registro',
    type: ComerValidfieldsEntity,
  })
  @Post()
  async createNewRegister(@Body() dto: ComerValidfieldsDto) {
    return await this.service.createNewRegister(dto);
  }

  @ApiOperation({ summary: 'Actualiza un registro' })
  @ApiBody({ type: ComerValidfieldsEntity })
  @ApiParam({
    name: 'id',
    description: 'Identificador.',
  })
  @ApiResponse({
    status: 200,
    description: 'Actualiza un registro',
    type: ComerValidfieldsEntity,
  })
  @Put()
  async updateRegister(@Body() dto: ComerValidfieldsDto) {
    return this.service.updateRegister(dto);
  }

  @ApiOperation({ summary: 'Elimina un registro por identificador' })
  @ApiParam({
    name: 'id',
    description: 'Busca por su identificador',
  })
  @Delete()
  async deleteRegister(@Body() dto: ComerValidfieldsInDto) {
    return await this.service.deleteRegister(dto);
  }
}
