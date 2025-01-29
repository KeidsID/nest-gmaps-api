import { ApiProperty } from "@nestjs/swagger";

export class AddressComponent {
  @ApiProperty()
  readonly long_name!: string;

  @ApiProperty()
  readonly short_name!: string;

  @ApiProperty()
  readonly types!: string[];
}
