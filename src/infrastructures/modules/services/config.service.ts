import { Injectable } from "@nestjs/common";
import { config as dotenv } from "dotenv";

import { ConfigService } from "~/domain/services.js";

@Injectable()
export class ConfigServiceImpl implements ConfigService {
  constructor() {
    dotenv();

    this.ENV = {
      APP: {
        PORT: Number(process.env.APP_PORT),
      },
      GOOGLE_MAPS: {
        API_KEY: String(process.env.GOOGLE_MAPS_API_KEY),
      },
    };
  }

  readonly ENV: ConfigService["ENV"];
}
