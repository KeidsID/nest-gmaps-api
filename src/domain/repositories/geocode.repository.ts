import { type GeocodeResult } from "~/domain/entities.js";

export abstract class GeocodeRepository {
  abstract geocoding(
    address: string,
    languageCode?: string,
  ): Promise<GeocodeResult[]>;

  abstract reverseGeocoding(
    lat: number,
    lng: number,
    languageCode?: string,
  ): Promise<GeocodeResult[]>;
}
