import { ApiProperty } from "@nestjs/swagger";

export class PlusCode {
  @ApiProperty({
    example: "RF75+42 Gunung Sari, Makassar City, South Sulawesi, Indonesia",
  })
  readonly compound_code!: string;

  @ApiProperty({ example: "6P6XRF75+42" })
  readonly global_code!: string;
}
