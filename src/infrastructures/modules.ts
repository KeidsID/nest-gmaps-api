import { Module } from "@nestjs/common";

import { GeocodeRepository } from "~/domain/repositories.js";
import { ConfigService } from "~/domain/services.js";

import { GeocodeRemoteData } from "./libs/data/remote/modules.js";
import { GeocodeRepositoryImpl } from "./modules/repositores.js";
import { ConfigServiceImpl } from "./modules/services.js";

@Module({
  providers: [
    GeocodeRemoteData,
    { provide: GeocodeRepository, useClass: GeocodeRepositoryImpl },
    //
    { provide: ConfigService, useClass: ConfigServiceImpl },
  ],
  exports: [GeocodeRepository, ConfigService],
})
export class InfrastructuresModule {}
