import { NestFactory } from "@nestjs/core";
import { type NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module.js";
import { AppPath } from "./interfaces/libs/enums.js";

async function main(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(AppPath.API);

  SwaggerModule.setup(AppPath.DOCS, app, () => {
    return SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle("Google Maps Proxy API")
        .setDescription("Simple RestAPI that act as Google Maps API proxy")
        .addServer(AppPath.API)
        .build(),
      { ignoreGlobalPrefix: true },
    );
  });

  const PORT = 3000;
  await app.listen(process.env.PORT ?? PORT);
}
void main();
