import { ApiProperty } from "@nestjs/swagger";

export class LatLng {
  @ApiProperty({ example: -5.187_177_399_999_999 })
  readonly lat!: number;

  @ApiProperty({ example: 119.457_519_7 })
  readonly lng!: number;
}

export class GeometryViewport {
  @ApiProperty({
    example: {
      lat: -5.185_843_619_708_497,
      lng: 119.458_902_930_291_5,
    },
  })
  readonly northeast!: LatLng;

  @ApiProperty({
    example: {
      lat: -5.188_541_580_291_502,
      lng: 119.456_204_969_708_5,
    },
  })
  readonly southwest!: LatLng;
}

export class Geometry {
  @ApiProperty()
  readonly location!: LatLng;

  @ApiProperty({ example: "ROOFTOP" })
  readonly location_type!: string;

  @ApiProperty()
  readonly viewport!: GeometryViewport;

  @ApiProperty({ required: false })
  readonly bounds?: GeometryViewport;
}
