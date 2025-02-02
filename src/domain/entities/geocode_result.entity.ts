import { ApiProperty } from "@nestjs/swagger";

import { AddressComponent } from "./address_component.entity.js";
import { Geometry } from "./geometry.entity.js";
import { PlusCode } from "./plus_code.entity.js";
export class GeocodeResult {
  @ApiProperty({
    type: [AddressComponent],
    example: [
      {
        long_name: "12",
        short_name: "12",
        types: ["street_number"],
      },
      {
        long_name: "M1",
        short_name: "M1",
        types: ["premise"],
      },
      {
        long_name: "Jalan Minasa Upa",
        short_name: "Jl. Minasa Upa",
        types: ["route"],
      },
      {
        long_name: "Gunung Sari",
        short_name: "Gn. Sari",
        types: ["administrative_area_level_4", "political"],
      },
      {
        long_name: "Kecamatan Rappocini",
        short_name: "Kec. Rappocini",
        types: ["administrative_area_level_3", "political"],
      },
      {
        long_name: "Kota Makassar",
        short_name: "Kota Makassar",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Sulawesi Selatan",
        short_name: "Sulawesi Selatan",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Indonesia",
        short_name: "ID",
        types: ["country", "political"],
      },
      {
        long_name: "90221",
        short_name: "90221",
        types: ["postal_code"],
      },
    ],
  })
  readonly address_components!: AddressComponent[];

  @ApiProperty({
    example:
      "Jl. Minasa Upa Blok M1 No.12, Gn. Sari, Kec. Rappocini, Kota Makassar, Sulawesi Selatan 90221, Indonesia",
  })
  readonly formatted_address!: string;

  @ApiProperty()
  readonly geometry!: Geometry;

  @ApiProperty({ example: "ChIJA7fZwAHjvi0Rw9DHcIHFc1E" })
  readonly place_id!: string;

  @ApiProperty({ required: false })
  readonly plus_code?: PlusCode;

  @ApiProperty({ type: [String], example: ["street_address"] })
  readonly types!: string[];
}
