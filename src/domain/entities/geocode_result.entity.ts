import { ApiProperty } from "@nestjs/swagger";

import { AddressComponent, Geometry, PlusCode } from "~/domain/entities.js";

export class GeocodeResult {
  @ApiProperty()
  readonly address_components!: AddressComponent[];

  @ApiProperty()
  readonly formatted_address!: string;

  @ApiProperty()
  readonly geometry!: Geometry;

  @ApiProperty()
  readonly place_id!: string;

  @ApiProperty()
  readonly plus_code!: PlusCode;

  @ApiProperty()
  readonly types!: string[];
}
