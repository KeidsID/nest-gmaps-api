import { applyDecorators } from "@nestjs/common";
import {
  ApiBody,
  type ApiBodyOptions,
  ApiOperation,
  ApiQuery,
  type ApiQueryOptions,
  ApiResponse,
  type ApiResponseOptions,
} from "@nestjs/swagger";

/** Add swagger docs for your API. */
export function ApiDocumentation(
  options: ApiDocumentationOptions,
): MethodDecorator {
  const {
    summary,
    description,
    request: { body: requestBody, query: requestQuery },
    response,
  } = options;

  const decorators: MethodDecorator[] = [
    ApiOperation({ summary, description }),
    requestBody && ApiBody(requestBody),
    requestQuery && ApiQuery(requestQuery),
    ApiResponse(response),
  ].filter(Boolean) as MethodDecorator[];

  return applyDecorators(...decorators);
}

export type ApiDocumentationOptions = {
  summary?: string;
  description?: string;
  request: { body?: ApiBodyOptions; query?: ApiQueryOptions };
  response: ApiResponseOptions;
};
