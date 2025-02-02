import { Get, HttpStatus, Query } from "@nestjs/common";

import {
  ApiDocumentation,
  ControllerWithTags,
} from "~/interfaces/libs/decorators.js";
import { ApiPath } from "~/interfaces/libs/enums.js";
import {
  GeocodeResponseDto,
  GeocodingUseCase,
  ReverseGeocodingUseCase,
} from "~/use_cases/modules.js";

const GeocodeApiPath = {
  ROOT: "/",
  REVERSE: "/reverse",
} as const;

@ControllerWithTags(ApiPath.GEOCODE)
export class GeocodeController {
  constructor(
    private readonly _geocodingUseCase: GeocodingUseCase,
    private readonly _reverseGeocodingUseCase: ReverseGeocodingUseCase,
  ) {}

  @Get(GeocodeApiPath.ROOT)
  @ApiDocumentation({
    summary: "Converts the address into latitude and longitude coordinates",
    request: {
      queries: [
        { name: "address", type: "string" },
        { name: "languageCode", type: "string", required: false },
      ],
    },
    response: { status: HttpStatus.OK, type: GeocodeResponseDto },
    externalDocs: {
      url: "https://developers.google.com/maps/documentation/geocoding/requests-geocoding",
    },
  })
  async geocoding(
    @Query("address") address: string,
    @Query("languageCode") languageCode?: string,
  ): Promise<GeocodeResponseDto> {
    return await this._geocodingUseCase.execute(address, languageCode);
  }

  @Get(GeocodeApiPath.REVERSE)
  @ApiDocumentation({
    summary: "Converts the latitude and longitude coordinates into an address",
    request: {
      queries: [
        { name: "lat", type: "number" },
        { name: "lng", type: "number" },
        { name: "languageCode", type: "string", required: false },
      ],
    },
    response: { status: HttpStatus.OK, type: GeocodeResponseDto },
    externalDocs: {
      url: "https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding",
    },
  })
  async reverseGeocoding(
    @Query("lat") lat: number,
    @Query("lng") lng: number,
    @Query("languageCode") languageCode?: string,
  ): Promise<GeocodeResponseDto> {
    return await this._reverseGeocodingUseCase.execute(lat, lng, languageCode);
  }
}
