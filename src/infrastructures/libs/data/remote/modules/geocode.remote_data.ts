import { Injectable } from "@nestjs/common";
import { AxiosInstance, AxiosResponse } from "axios";

import { ConfigService } from "~/domain/services.js";

import { GeocodeApiClient } from "../libs/clients.js";
import { handleErrorResponse } from "../libs/utils.js";

@Injectable()
export class GeocodeRemoteData {
  constructor(private _configService: ConfigService) {
    this._apiClient = GeocodeApiClient(
      this._configService.ENV.GOOGLE_MAPS.API_KEY,
    );
  }

  private _apiClient: AxiosInstance;

  /**
   *  @link https://developers.google.com/maps/documentation/geocoding/requests-geocoding
   */
  async geocoding(
    address: string,
    languageCode?: string,
  ): Promise<AxiosResponse<Record<string, unknown>>> {
    try {
      return await this._apiClient.get("/", {
        params: { address, language: languageCode },
      });
    } catch (error) {
      throw handleErrorResponse(error);
    }
  }

  /**
   * @link https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding
   */
  async reverseGeocoding(
    lat: number,
    lng: number,
    languageCode?: string,
  ): Promise<AxiosResponse<Record<string, unknown>>> {
    try {
      return await this._apiClient.get("/", {
        params: {
          latlng: `${lat.toString()},${lng.toString()}`,
          language: languageCode,
        },
      });
    } catch (error) {
      throw handleErrorResponse(error);
    }
  }
}
