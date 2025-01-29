import { Injectable } from "@nestjs/common";

import { type GeocodeResult } from "~/domain/entities.js";
import { type GeocodeRepository } from "~/domain/repositories.js";
import { GeocodeRemoteData } from "~/infrastructures/libs/data/remote/modules.js";

@Injectable()
export class GeocodeRepositoryImpl implements GeocodeRepository {
  constructor(private _remoteData: GeocodeRemoteData) {}

  async geocoding(
    address: string,
    languageCode?: string,
  ): Promise<GeocodeResult[]> {
    const response = await this._remoteData.geocoding(address, languageCode);
    const responseBody = response.data;

    return (responseBody.results ?? []) as GeocodeResult[];
  }

  async reverseGeocoding(
    lat: number,
    lng: number,
    languageCode?: string,
  ): Promise<GeocodeResult[]> {
    const response = await this._remoteData.reverseGeocoding(
      lat,
      lng,
      languageCode,
    );
    const responseBody = response.data;

    return (responseBody.results ?? []) as GeocodeResult[];
  }
}
