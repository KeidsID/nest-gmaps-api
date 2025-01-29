import { applyDecorators, Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

/**
 * Decorator that marks a class as {@link Controller} with {@link ApiTags}.
 *
 * @param basePath - Controller base path.
 * @param tags - Swagger tags, `[basePath]` by default.
 */
export function AppController(
  basePath: string,
  tags: string[] = [basePath],
): ClassDecorator {
  return applyDecorators(Controller(basePath), ApiTags(...tags));
}
