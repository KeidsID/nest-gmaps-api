import { Injectable } from "@nestjs/common";

import { GeocodeRepository } from "~/domain/repositories.js";
import { CommonNumber } from "~/libs/enums.js";
import { UseCase } from "~/use_cases/libs/types.js";

import { GeocodeResponseDto } from "../libs/dtos.js";
import { GeocodeResponseStatus } from "../libs/enums.js";

@Injectable()
export class GeocodingUseCase implements UseCase<GeocodeResponseDto> {
  constructor(private _geocodeRepository: GeocodeRepository) {}

  async execute(address: string): Promise<GeocodeResponseDto> {
    const results = await this._geocodeRepository.geocoding(address);

    return {
      status:
        results.length > CommonNumber.ZERO
          ? GeocodeResponseStatus.OK
          : GeocodeResponseStatus.ZERO_RESULTS,
      results,
    };
  }
}
