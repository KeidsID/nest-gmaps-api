import { Injectable } from "@nestjs/common";
import { config as dotenv } from "dotenv";

import { ConfigService } from "~/domain/services.js";

@Injectable()
export class ConfigServiceImpl implements ConfigService {
  constructor() {
    dotenv();

    const PORT_DEFAULT = 3000;

    this.ENV = {
      APP: {
        PORT: Number(process.env.APP_PORT) || PORT_DEFAULT,
        ORIGINS: process.env.APP_ORIGINS?.split(",").map((origin) =>
          origin.trim(),
        ) || ["*"],
      },
      GOOGLE_MAPS: {
        API_KEY: String(process.env.GOOGLE_MAPS_API_KEY),
      },
    };
  }

  readonly ENV: ConfigService["ENV"];
}
