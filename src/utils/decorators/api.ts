import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { GeneralResponse, PaginatedResult } from 'src/types';

export const ApiGeneralResponse = <DataDto extends Type<unknown>>(
  dataDto?: DataDto,
  status = 200,
) =>
  applyDecorators(
    ApiExtraModels(GeneralResponse, dataDto),
    ApiResponse({
      status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(GeneralResponse) },
          {
            properties: {
              result: {
                type: 'object',
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  );

export const ApiPaginatedResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(PaginatedResult, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResult) },
          {
            properties: {
              result: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
