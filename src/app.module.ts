import { Module } from "@nestjs/common";

import { AppController } from "./app.controller.js";
import { InterfacesModule } from "./interfaces/modules.js";

@Module({
  imports: [InterfacesModule],
  controllers: [AppController],
})
export class AppModule {}
