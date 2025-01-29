import { Module } from "@nestjs/common";

import {
  GeocodingUseCase,
  ReverseGeocodingUseCase,
} from "./modules/geocode/modules.js";

const modules = [GeocodingUseCase, ReverseGeocodingUseCase];

@Module({ providers: modules, exports: modules })
export class UseCasesModule {}

export * from "./modules/geocode/modules.js";
