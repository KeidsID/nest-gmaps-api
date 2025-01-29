import { ApiProperty } from "@nestjs/swagger";

export class PlusCode {
  @ApiProperty()
  readonly compound_code!: string;

  @ApiProperty()
  readonly global_code!: string;
}
