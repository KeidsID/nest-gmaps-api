import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  type ApiBodyOptions,
  ApiOperation,
  type ApiOperationOptions,
  ApiQuery,
  type ApiQueryOptions,
  ApiResponse,
  type ApiResponseOptions,
} from "@nestjs/swagger";

import { CommonNumber } from "~/libs/enums.js";

/** Add swagger docs for your API. */
export function ApiDocumentation(
  options: ApiDocumentationOptions,
): MethodDecorator {
  const {
    summary,
    description,
    externalDocs,
    request: { body: requestBody, queries: requestQueries = [] },
    response,
  } = options;

  const decorators: MethodDecorator[] = [
    ApiOperation({ summary, description, externalDocs }),
    ...(requestBody ? [ApiBody(requestBody)] : []),
    ...(requestQueries.length > CommonNumber.ZERO
      ? requestQueries.map((options) => ApiQuery(options))
      : []),
    ApiResponse(response),
  ];

  return applyDecorators(...decorators);
}

export type ApiDocumentationOptions = {
  summary?: string;
  description?: string;
  externalDocs?: ApiOperationOptions["externalDocs"];
  request: { body?: ApiBodyOptions; queries: ApiQueryOptions[] };
  response: ApiResponseOptions;
};
