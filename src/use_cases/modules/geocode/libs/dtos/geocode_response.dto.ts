import { ApiProperty } from "@nestjs/swagger";

import { GeocodeResult } from "~/domain/entities.js";
import { ValueOf } from "~/libs/types.js";

import { GeocodeResponseStatus } from "../enums.js";

export class GeocodeResponseDto {
  @ApiProperty({ enum: GeocodeResponseStatus, example: "OK" })
  readonly status!: ValueOf<typeof GeocodeResponseStatus>;

  @ApiProperty()
  readonly results!: GeocodeResult[];
}
