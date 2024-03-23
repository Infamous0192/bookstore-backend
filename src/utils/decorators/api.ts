import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { GeneralResponse, PaginatedResult } from 'src/types';

export const ApiGeneralResponse = <DataDto extends Type<unknown>>(
  dataDto?: DataDto | DataDto[],
  status = 200,
) => {
  if (!dataDto) {
    return applyDecorators(
      ApiExtraModels(GeneralResponse),
      ApiResponse({
        status,
      }),
    );
  }

  if (Array.isArray(dataDto)) {
    return applyDecorators(
      ApiExtraModels(PaginatedResult, dataDto[0]),
      ApiOkResponse({
        schema: {
          allOf: [
            { $ref: getSchemaPath(PaginatedResult) },
            {
              properties: {
                result: {
                  type: 'array',
                  items: { $ref: getSchemaPath(dataDto[0]) },
                },
              },
            },
          ],
        },
      }),
    );
  }

  return applyDecorators(
    ApiExtraModels(
      GeneralResponse,
      Array.isArray(dataDto) ? dataDto[0] : dataDto,
    ),
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
};

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
