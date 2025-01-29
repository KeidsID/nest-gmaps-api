import { ApiProperty } from "@nestjs/swagger";

export class Geometry {
  @ApiProperty()
  readonly location!: LatLng;

  @ApiProperty()
  readonly location_type!: string;

  @ApiProperty()
  readonly viewport!: GeometryViewport;
}

export class LatLng {
  @ApiProperty()
  readonly lat!: number;

  @ApiProperty()
  readonly lng!: number;
}

export class GeometryViewport {
  @ApiProperty()
  readonly northeast!: LatLng;
  @ApiProperty()
  readonly southwest!: LatLng;
}
