import { NestFactory } from "@nestjs/core";
import { type NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module.js";
import { ConfigService } from "./domain/services.js";
import { AppPath } from "./interfaces/libs/enums.js";

async function main(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(AppPath.API, { exclude: [AppPath.ROOT] });

  SwaggerModule.setup(AppPath.DOCS, app, () => {
    return SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle("Google Maps API Proxy")
        .setDescription("Simple proxy server for Google Maps API")
        .addServer(AppPath.API)
        .build(),
      { ignoreGlobalPrefix: true },
    );
  });

  const { ENV } = app.get(ConfigService);

  await app.listen(ENV.APP.PORT);
}
void main();
