import { Module } from "@nestjs/common";

import { UseCasesModule } from "~/use_cases/modules.js";

import { GeocodeController } from "./modules/geocode.controller.js";

@Module({
  imports: [UseCasesModule],
  controllers: [GeocodeController],
})
export class InterfacesModule {}
