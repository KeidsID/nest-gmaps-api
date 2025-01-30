import { Controller, Get, Redirect } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";

import { AppPath } from "./interfaces/libs/enums.js";

@Controller(AppPath.ROOT)
@ApiExcludeController()
export class AppController {
  @Get()
  @Redirect(AppPath.DOCS)
  rootRedirect(): string {
    return "Redirecting to documentations...";
  }
}
