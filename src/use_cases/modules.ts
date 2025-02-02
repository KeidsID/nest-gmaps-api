import { Module } from "@nestjs/common";

import { InfrastructuresModule } from "~/infrastructures/modules.js";

import {
  GeocodingUseCase,
  ReverseGeocodingUseCase,
} from "./modules/geocode/modules.js";

const modules = [GeocodingUseCase, ReverseGeocodingUseCase];

@Module({
  imports: [InfrastructuresModule],
  providers: modules,
  exports: modules,
})
export class UseCasesModule {}

export * from "./modules/geocode/modules.js";
